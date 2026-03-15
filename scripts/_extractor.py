"""
scripts/_extractor.py
---------------------
Shared HTML → clean GitHub-Flavored Markdown extraction logic for
labuladong crawlers.

Site tech stack (confirmed via debug):
  - Next.js 14 with SSR
  - Shiki syntax highlighter (NOT highlight.js / Prism)
    → <pre class="shiki shiki-themes github-light github-dark">
    → <code> has NO class — language comes from the tab widget
    → token spans use inline `style` attributes, NOT class names
  - Radix UI Tabs for multi-language code examples
    → <div class="code-with-tabs">
         <div data-slot="tabs">
           <div role="tablist">
             <button role="tab" data-state="active"
                     aria-controls="...-content-java">Java</button>
             …other lang buttons…
           </div>
           (only the active panel is SSR-rendered; others are loaded by JS)
         </div>
       </div>
  - Headings include <a href="#id">¶</a> deep-link anchors

Pipeline
--------
1.  Remove noisy chrome (nav, footer, scripts …)
2.  Locate the main article body element
3.  Pre-process the BeautifulSoup tree
    a. Strip ¶ / # anchor tags from headings
    b. Handle code-with-tabs containers:
       – Read language from the active tab's aria-controls ("…-content-java" → "java")
       – Extract code via get_text() (NOT get_text("\\n"), which fragments Shiki spans)
       – Replace the ENTIRE container with a placeholder
    c. Handle any remaining bare <pre> blocks
    d. Remove tab-switcher UI elements (buttons)
    e. Rewrite relative image /src → absolute
    f. Remove data: placeholder images
4.  Convert remaining HTML → Markdown via html2text
5.  Post-process the Markdown string
    a. Inject code fences back in place of placeholders
    b. Strip ¶ / § characters
    c. Remove language-tab label blobs (CC++GoJavaJavaScriptPython …)
    d. Remove noise lines (loading notices, Copy button text, timestamps)
    e. Fix HTML entities, collapse blank lines
"""

import re
import textwrap
from bs4 import BeautifulSoup, Tag

BASE_URL = "https://labuladong.online"

# ── Language name normalisation ───────────────────────────────────────────────
_LANG_ALIAS: dict[str, str] = {
    "js":         "javascript",
    "ts":         "typescript",
    "sh":         "bash",
    "shell":      "bash",
    "golang":     "go",
    "c++":        "cpp",
    "cplusplus":  "cpp",
}


def _normalise_lang(raw: str) -> str:
    raw = raw.strip().lower()
    return _LANG_ALIAS.get(raw, raw)


# ── Language tab label pattern (post-process leftover) ───────────────────────
_LANG_NAMES_RE = r"C\+\+|TypeScript|JavaScript|Python|Kotlin|Swift|Golang|Rust|Java|Go|C"
_LANG_TAB_RE = re.compile(
    r"^(?:" + _LANG_NAMES_RE + r")(?:" + _LANG_NAMES_RE + r")+\s*$",
    re.MULTILINE,
)

# ── Noise line patterns ───────────────────────────────────────────────────────
_NOISE_RES = [
    re.compile(r"加载思维导图\.+"),
    re.compile(r"Loading (?:mindmap|comments)\.+"),
    re.compile(r"更新时间[：:]\s*\d{4}[/\-]\d{2}[/\-]\d{2}.*"),
    re.compile(r"^\s*Copy\s*$", re.MULTILINE),
    re.compile(r"^\s*Run\s*$",  re.MULTILINE),
    re.compile(r"^\s*Ask AI\s*$", re.MULTILINE),
]

# ── Selectors to remove entirely ─────────────────────────────────────────────
_REMOVE_CSS = [
    "script", "style", "noscript", "nav", "header", "footer",
    ".ads", ".banner", "#header", "#footer", "#sidebar",
    ".sidebar", ".toc", ".breadcrumb", ".pagination",
    ".share", ".comment", ".comments",
    "[class*='navigation']", "[class*='nav-']", "[class*='-nav']",
    "[class*='menu']", "[class*='toolbar']",
    "[class*='paywall']", "[class*='vip']", "[class*='subscribe']",
    "[class*='advertisement']", "[class*='ad-']",
    "[class*='loading']", "[class*='mindmap']",
]

# ── Content area selectors (tried in order) ───────────────────────────────────
_CONTENT_CSS = [
    "article",
    "main",
    "[class*='article']",
    "[class*='content']",
    "[class*='post']",
    "[class*='markdown']",
    "[class*='prose']",
]


# ══════════════════════════════════════════════════════════════════════════════
#  Internal helpers
# ══════════════════════════════════════════════════════════════════════════════

def _find_content(soup: BeautifulSoup) -> Tag:
    """Strip chrome, then return the main article element."""
    for sel in _REMOVE_CSS:
        for tag in soup.select(sel):
            tag.decompose()

    for sel in _CONTENT_CSS:
        found = soup.select_one(sel)
        if found and len(found.get_text(strip=True)) > 200:
            return found
    return soup.body or soup


def _lang_from_aria_controls(aria: str) -> str:
    """
    Extract language from Radix UI aria-controls value.
    e.g. "radix-_R_3j3adbsnj5sqhivb_-content-java" → "java"
         "radix-...-content-cpp"                    → "cpp"
    """
    # Take everything after the last "-content-"
    marker = "-content-"
    idx = aria.rfind(marker)
    if idx == -1:
        return ""
    raw = aria[idx + len(marker):]
    return _normalise_lang(raw)


def _shiki_code_text(pre: Tag) -> str:
    """
    Extract clean code from a Shiki <pre> block.

    Shiki wraps each line in <span class="line"> and tokens in inline-styled
    <span> elements.  Using get_text() (no separator) correctly concatenates
    all token text; the newlines between lines are preserved as text nodes
    inside the HTML.
    """
    code_tag = pre.find("code")
    if not code_tag:
        raw = pre.get_text()
    else:
        raw = code_tag.get_text()   # ← NO separator (not "\n")

    # Strip leading / trailing blank lines only
    lines = raw.split("\n")
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return "\n".join(lines)


# ══════════════════════════════════════════════════════════════════════════════
#  Code block extraction
# ══════════════════════════════════════════════════════════════════════════════

def _extract_code_blocks(content: Tag) -> tuple[Tag, dict[str, str]]:
    """
    Replace every code block with a unique text placeholder.
    Returns (modified content, {placeholder: markdown_fence}).

    Strategy
    --------
    A.  code-with-tabs containers (multi-language Radix UI widget)
        – Get language from the active tab button's aria-controls attribute
        – Get code from the single <pre> in that container (only active panel
          is SSR-rendered; inactive panels are JS-loaded and absent here)
        – Replace the WHOLE container div with the placeholder
    B.  Bare <pre><code> blocks not inside code-with-tabs
        – Language comes from code element class="language-*" if present
        – Replace the <pre> with the placeholder
    """
    code_map: dict[str, str] = {}
    counter = 0

    # ── A. code-with-tabs ────────────────────────────────────────────────────
    for container in content.select(".code-with-tabs"):
        # Find the active tab to determine language
        lang = ""
        active_btn = container.select_one(
            "[role='tab'][data-state='active'], [role='tab'][aria-selected='true']"
        )
        if active_btn:
            aria = active_btn.get("aria-controls", "")
            lang = _lang_from_aria_controls(aria)

        # Get the (only) <pre> rendered for this container
        pre = container.select_one("pre")
        if pre is None:
            # No code rendered (probably paywalled); leave placeholder
            placeholder = f"___CODEBLOCK_{counter}___"
            code_map[placeholder] = f"```{lang}\n(code not available)\n```"
            counter += 1
            new_node = BeautifulSoup(
                f"<div>\n{placeholder}\n</div>", "html.parser"
            ).div
            container.replace_with(new_node)
            continue

        code_text = _shiki_code_text(pre)
        placeholder = f"___CODEBLOCK_{counter}___"
        code_map[placeholder] = f"```{lang}\n{code_text}\n```"
        counter += 1

        new_node = BeautifulSoup(
            f"<div>\n{placeholder}\n</div>", "html.parser"
        ).div
        container.replace_with(new_node)

    # ── B. Bare <pre> blocks (not already replaced) ──────────────────────────
    for pre in content.select("pre"):
        code_tag = pre.find("code")
        # Detect language from class="language-*" on <code> or <pre>
        lang = ""
        for source in ([code_tag] if code_tag else []) + [pre]:
            for cls in (source.get("class") or []):
                if isinstance(cls, str) and cls.startswith("language-"):
                    lang = _normalise_lang(cls.removeprefix("language-"))
                    break
            if lang:
                break

        code_text = _shiki_code_text(pre)
        placeholder = f"___CODEBLOCK_{counter}___"
        code_map[placeholder] = f"```{lang}\n{code_text}\n```"
        counter += 1

        new_node = BeautifulSoup(
            f"<div>\n{placeholder}\n</div>", "html.parser"
        ).div
        pre.replace_with(new_node)

    return content, code_map


# ══════════════════════════════════════════════════════════════════════════════
#  Pre-processing (heading anchors, images, tab buttons)
# ══════════════════════════════════════════════════════════════════════════════

def _preprocess(content: Tag) -> Tag:
    """
    3a. Strip ¶ anchor tags from headings.
    3b. Remove tab-switcher UI button rows (role=tablist).
    3c. Remove hidden (display:none / hidden attr) elements.
    3d. Rewrite relative image URLs → absolute.
    3e. Delete data: placeholder images.
    """
    # 3a. ¶ anchors inside headings
    for heading in content.select("h1,h2,h3,h4,h5,h6"):
        for anchor in heading.find_all("a"):
            if anchor.get_text(strip=True) in ("¶", "#", "§", ""):
                anchor.decompose()

    # 3b. Tab list UI (keep the code panels, ditch the button rows)
    for el in content.select("[role='tablist'], [data-slot='tabs-list']"):
        el.decompose()

    # 3c. Hidden elements (inactive multi-lang panels, if JS partially rendered)
    hidden_re = re.compile(r"display\s*:\s*none", re.IGNORECASE)
    for el in content.find_all(style=hidden_re):
        el.decompose()
    for el in content.find_all(hidden=True):
        el.decompose()

    # 3d & 3e. Images
    for img in content.select("img"):
        src = img.get("src", "")
        if src.startswith("data:"):
            img.decompose()
            continue
        if src.startswith("/"):
            img["src"] = BASE_URL + src
        if not img.get("alt"):
            img["alt"] = "diagram"

    # Remove data: <source> tags (next/image placeholders)
    for src_tag in content.select("source[srcset]"):
        if src_tag.get("srcset", "").startswith("data:"):
            src_tag.decompose()

    return content


# ══════════════════════════════════════════════════════════════════════════════
#  Post-processing
# ══════════════════════════════════════════════════════════════════════════════

def _postprocess(md: str, code_map: dict[str, str]) -> str:
    # Inject fences
    for placeholder, fence in code_map.items():
        md = md.replace(placeholder, fence)

    # Remove ¶ / § residue
    md = md.replace("¶", "").replace("§", "")

    # Remove tab-label blobs (e.g. "CC++GoJavaJavaScriptPython")
    md = _LANG_TAB_RE.sub("", md)

    # Remove noise lines
    for pat in _NOISE_RES:
        md = pat.sub("", md)

    # Remove data: image leftovers
    md = re.sub(r"!\[.*?\]\(data:[^)]+\)", "", md)

    # Decode common HTML entities
    md = (
        md.replace("&nbsp;", " ")
          .replace("&gt;",   ">")
          .replace("&lt;",   "<")
          .replace("&amp;",  "&")
          .replace("&quot;", '"')
          .replace("&#39;",  "'")
    )

    # Collapse 3+ blank lines → 2
    md = re.sub(r"\n{3,}", "\n\n", md)

    return md.strip()


# ══════════════════════════════════════════════════════════════════════════════
#  Public API
# ══════════════════════════════════════════════════════════════════════════════

def extract_article(
    html:          str,
    url:           str,
    archive_label: str = "labuladong.online",
) -> str:
    """
    Full pipeline: raw SSR HTML → clean GitHub-Flavored Markdown.

    Parameters
    ----------
    html          : raw HTML from the server
    url           : page path used in the > Source header
    archive_label : shown in the > Archived: line
    """
    try:
        import html2text as _h2t
    except ImportError:
        raise ImportError("pip install html2text")

    soup = BeautifulSoup(html, "html.parser")

    # Title from <title> tag
    title_tag = soup.find("title")
    title = (
        title_tag.get_text(strip=True).split("|")[0].strip()
        if title_tag else "Untitled"
    )

    # Pipeline
    # NOTE: code extraction MUST come before _preprocess, because _preprocess
    # removes [role='tablist'] elements that contain the active-tab language info.
    content              = _find_content(soup)
    content, code_map    = _extract_code_blocks(content)   # reads tab lang first
    content              = _preprocess(content)             # then strips tab UI

    # html2text conversion (handles headings, links, images, lists, tables)
    h = _h2t.HTML2Text()
    h.ignore_links      = False
    h.ignore_images     = False
    h.ignore_emphasis   = False
    h.body_width        = 0        # never line-wrap
    h.unicode_snob      = True
    h.skip_internal_links = True
    h.protect_links     = True
    h.wrap_links        = False

    raw_md = h.handle(str(content))
    md     = _postprocess(raw_md, code_map)

    header = textwrap.dedent(f"""\
        # {title}

        > Source: {BASE_URL}{url}
        > Archived: {archive_label}

        ---

    """)

    return header + md + "\n"
