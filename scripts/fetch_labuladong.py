"""
scripts/fetch_labuladong.py
---------------------------
Archive labuladong.online/zh/algo/ tutorial articles as clean Markdown files.

Output folder structure (mirrors the URL path under /zh/algo/):
  content/labuladong/
    intro/
      quick-learning-plan.md
      beginner-learning-plan.md
      ...
    programming-language-basic/
      c.md
      cpp.md
      ...
    data-structure-basic/
      array-basic.md
      linkedlist-basic.md
      ...
    essential-technique/          ← Chapter 0
      algorithm-summary.md
      ...
    data-structure/               ← Chapter 1 algorithms
      reverse-linked-list-recursion.md
      ...
    practice-in-action/
      ...
    frequency-interview/
      ...
    problem-set/
      ...

Usage:
    python scripts/fetch_labuladong.py            # fetch all
    python scripts/fetch_labuladong.py --dry-run  # print URLs only
"""

import sys
import io
import os
# Force UTF-8 stdout on Windows
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
import re
import time
import textwrap
import urllib.request
from pathlib import Path

# ── Optional imports ────────────────────────────────────────────────────────
try:
    from bs4 import BeautifulSoup
except ImportError:
    sys.exit("Install beautifulsoup4: pip install beautifulsoup4")

try:
    import html2text
except ImportError:
    sys.exit("Install html2text: pip install html2text")


# ══════════════════════════════════════════════════════════════════════════════
#  CONFIGURATION
# ══════════════════════════════════════════════════════════════════════════════

BASE_URL = "https://labuladong.online"
LANG_PREFIX = "/zh/algo"

# Output root — relative to this script's parent directory
SCRIPT_DIR = Path(__file__).parent
OUTPUT_ROOT = SCRIPT_DIR.parent / "content" / "labuladong"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}

DELAY = 1.2        # seconds between requests (be polite)
TIMEOUT = 20       # request timeout in seconds


# ══════════════════════════════════════════════════════════════════════════════
#  KNOWN URL CATALOGUE  (seed list — crawler also discovers additional links)
# ══════════════════════════════════════════════════════════════════════════════

SEED_URLS = [
    # ── Site introduction ────────────────────────────────────────────────────
    "/zh/algo/home/",

    # ── Learning plans ───────────────────────────────────────────────────────
    "/zh/algo/intro/quick-learning-plan/",
    "/zh/algo/intro/beginner-learning-plan/",
    "/zh/algo/intro/how-to-learn-algorithms/",
    "/zh/algo/intro/how-to-practice/",

    # ── Tools guides ─────────────────────────────────────────────────────────
    "/zh/algo/intro/ai-assistant/",
    "/zh/algo/intro/visualize/",
    "/zh/algo/intro/game/",
    "/zh/algo/intro/chrome/",
    "/zh/algo/intro/vscode/",
    "/zh/algo/intro/jetbrains/",

    # ── Chapter: Programming Language Basics ─────────────────────────────────
    "/zh/algo/intro/programming-language-basic/",
    "/zh/algo/programming-language-basic/c/",
    "/zh/algo/programming-language-basic/cpp/",
    "/zh/algo/programming-language-basic/java/",
    "/zh/algo/programming-language-basic/golang/",
    "/zh/algo/programming-language-basic/python/",
    "/zh/algo/intro/js/",
    "/zh/algo/intro/leetcode/",
    "/zh/algo/programming-language-basic/lc-practice/",
    "/zh/algo/intro/acm-mode/",

    # ── Chapter: Data Structures & Sorting (Fundamentals) ────────────────────
    "/zh/algo/intro/data-structure-basic/",
    "/zh/algo/intro/complexity-basic/",
    "/zh/algo/intro/sorting/",
    # Arrays & Linked Lists
    "/zh/algo/data-structure-basic/array-basic/",
    "/zh/algo/data-structure-basic/array-implement/",
    "/zh/algo/data-structure-basic/linkedlist-basic/",
    "/zh/algo/data-structure-basic/linkedlist-implement/",
    "/zh/algo/data-structure-basic/cycle-array/",
    "/zh/algo/data-structure-basic/skip-list-basic/",
    "/zh/algo/data-structure-basic/bitmap/",
    # Queue & Stack
    "/zh/algo/data-structure-basic/queue-stack-basic/",
    "/zh/algo/data-structure-basic/linked-queue-stack/",
    "/zh/algo/data-structure-basic/array-queue-stack/",
    "/zh/algo/data-structure-basic/deque-implement/",
    # Hash
    "/zh/algo/data-structure-basic/hashmap-basic/",
    "/zh/algo/data-structure-basic/hashtable-chaining/",
    "/zh/algo/data-structure-basic/linear-probing-key-point/",
    "/zh/algo/data-structure-basic/linear-probing-code/",
    "/zh/algo/data-structure-basic/hash-set/",
    "/zh/algo/data-structure-basic/hashtable-with-linked-list/",
    "/zh/algo/data-structure-basic/hashtable-with-array/",
    "/zh/algo/data-structure-basic/bloom-filter/",
    # Binary Trees
    "/zh/algo/data-structure-basic/binary-tree-basic/",
    "/zh/algo/data-structure-basic/binary-tree-traverse-basic/",
    "/zh/algo/data-structure-basic/use-case-of-dfs-bfs/",
    "/zh/algo/data-structure-basic/n-ary-tree-traverse-basic/",
    "/zh/algo/data-structure-basic/tree-map-basic/",
    "/zh/algo/data-structure-basic/rbtree-basic/",
    "/zh/algo/data-structure-basic/trie-map-basic/",
    "/zh/algo/data-structure-basic/binary-heap-basic/",
    "/zh/algo/data-structure-basic/binary-heap-implement/",
    "/zh/algo/data-structure-basic/segment-tree-basic/",
    "/zh/algo/data-structure-basic/huffman-tree/",
    # Graphs
    "/zh/algo/data-structure-basic/graph-terminology/",
    "/zh/algo/data-structure-basic/graph-basic/",
    "/zh/algo/data-structure-basic/graph-traverse-basic/",
    "/zh/algo/data-structure-basic/eulerian-graph/",
    "/zh/algo/data-structure-basic/graph-shortest-path/",
    "/zh/algo/data-structure-basic/graph-minimum-spanning-tree/",
    "/zh/algo/data-structure-basic/union-find-basic/",
    # Sorting
    "/zh/algo/data-structure-basic/sort-basic/",
    "/zh/algo/data-structure-basic/select-sort/",
    "/zh/algo/data-structure-basic/bubble-sort/",
    "/zh/algo/data-structure-basic/insertion-sort/",
    "/zh/algo/data-structure-basic/shell-sort/",
    "/zh/algo/data-structure-basic/quick-sort/",
    "/zh/algo/data-structure-basic/merge-sort/",
    "/zh/algo/data-structure-basic/heap-sort/",
    "/zh/algo/data-structure-basic/counting-sort/",
    "/zh/algo/data-structure-basic/bucket-sort/",
    "/zh/algo/data-structure-basic/radix-sort/",

    # ── Chapter 0: Core Problem-Solving Frameworks ────────────────────────────
    "/zh/algo/intro/core-intro/",
    "/zh/algo/essential-technique/algorithm-summary/",
    "/zh/algo/essential-technique/linked-list-skills-summary/",
    "/zh/algo/essential-technique/array-two-pointers-summary/",
    "/zh/algo/essential-technique/sliding-window-framework/",
    "/zh/algo/essential-technique/binary-tree-summary/",
    "/zh/algo/essential-technique/understand-recursion/",
    "/zh/algo/essential-technique/dynamic-programming-framework/",
    "/zh/algo/essential-technique/backtrack-framework/",
    "/zh/algo/essential-technique/bfs-framework/",
    "/zh/algo/essential-technique/permutation-combination-subset-all-in-one/",
    "/zh/algo/essential-technique/greedy/",
    "/zh/algo/essential-technique/divide-and-conquer/",
    "/zh/algo/essential-technique/complexity-analysis/",

    # ── Chapter 1: Classic Data Structure Algorithms ──────────────────────────
    # Linked List
    "/zh/algo/essential-technique/linked-list-skills-summary-2/",
    "/zh/algo/problem-set/linkedlist-two-pointers/",
    "/zh/algo/data-structure/reverse-linked-list-recursion/",
    "/zh/algo/data-structure/palindrome-linked-list/",
    # Array
    "/zh/algo/essential-technique/array-two-pointers-summary-2/",
    "/zh/algo/practice-in-action/2d-array-traversal-summary/",
    "/zh/algo/problem-set/array-two-pointers/",
    "/zh/algo/practice-in-action/nsum/",
    "/zh/algo/data-structure/prefix-sum/",
    "/zh/algo/problem-set/perfix-sum/",
    "/zh/algo/data-structure/diff-array/",
    "/zh/algo/essential-technique/sliding-window-framework-2/",
    "/zh/algo/problem-set/sliding-window/",
    "/zh/algo/practice-in-action/rabinkarp/",
    "/zh/algo/essential-technique/binary-search-framework/",
    "/zh/algo/essential-technique/binary-search-left-open/",
    "/zh/algo/frequency-interview/binary-search-in-action/",
    "/zh/algo/problem-set/binary-search/",
    "/zh/algo/frequency-interview/random-pick-with-weight/",
    "/zh/algo/practice-in-action/advantage-shuffle/",
    # Queue & Stack
    "/zh/algo/data-structure/stack-queue/",
    "/zh/algo/problem-set/stack/",
    "/zh/algo/problem-set/parentheses/",
    "/zh/algo/problem-set/queue/",
    "/zh/algo/data-structure/monotonic-stack/",
    "/zh/algo/problem-set/monotonic-stack/",
    "/zh/algo/data-structure/monotonic-queue/",
    "/zh/algo/problem-set/monotonic-queue/",
    # Binary Tree
    "/zh/algo/data-structure/binary-tree-part1/",
    "/zh/algo/data-structure/binary-tree-part2/",
    "/zh/algo/data-structure/binary-tree-part3/",
    "/zh/algo/data-structure/serialize-and-deserialize-binary-tree/",
    "/zh/algo/data-structure/binary-tree-level-order/",
    "/zh/algo/problem-set/binary-tree-traverse/",
    "/zh/algo/problem-set/binary-tree-post-order/",
    "/zh/algo/problem-set/binary-tree-divide-conquer/",
    "/zh/algo/problem-set/level-traverse/",
    # BST
    "/zh/algo/data-structure/bst-part1/",
    "/zh/algo/data-structure/bst-part2/",
    "/zh/algo/data-structure/bst-part3/",
    "/zh/algo/data-structure/bst-part4/",
    "/zh/algo/problem-set/bst/",
    # Trie
    "/zh/algo/data-structure/trie/",
    "/zh/algo/problem-set/trie/",
    # Data Structure Design
    "/zh/algo/frequency-interview/design-exam-room/",
    "/zh/algo/frequency-interview/lru/",
    "/zh/algo/frequency-interview/lfu/",
    "/zh/algo/frequency-interview/design-twitter/",
    "/zh/algo/problem-set/data-structure-classic-design/",
    # Graph
    "/zh/algo/data-structure/graph-traverse/",
    "/zh/algo/data-structure/bipartite-graph/",
    "/zh/algo/data-structure/topology/",
    "/zh/algo/data-structure/kruskal/",
    "/zh/algo/data-structure/prim/",
    "/zh/algo/data-structure/dijkstra/",
    "/zh/algo/problem-set/graph-dfs/",
    "/zh/algo/problem-set/graph-bfs/",
    "/zh/algo/problem-set/union-find/",
    "/zh/algo/data-structure/union-find/",

    # ── Chapter 2: Brute Force Search ────────────────────────────────────────
    # DFS / Backtracking
    "/zh/algo/essential-technique/backtrack-framework-2/",
    "/zh/algo/essential-technique/permutation-combination-subset-all-in-one-2/",
    "/zh/algo/practice-in-action/sudoku/",
    "/zh/algo/practice-in-action/n-queens/",
    "/zh/algo/problem-set/backtracking/",
    "/zh/algo/problem-set/dfs-bfs/",
    # BFS
    "/zh/algo/essential-technique/bfs-framework-2/",
    "/zh/algo/problem-set/bfs/",

    # ── Chapter 3: Dynamic Programming ───────────────────────────────────────
    "/zh/algo/essential-technique/dynamic-programming-framework-2/",
    "/zh/algo/dynamic-programming/base-case-and-state/",
    "/zh/algo/dynamic-programming/fibonaci/",
    "/zh/algo/dynamic-programming/coin-change/",
    "/zh/algo/dynamic-programming/word-break/",
    "/zh/algo/dynamic-programming/subsequence-problem/",
    "/zh/algo/dynamic-programming/longest-increasing-subsequence/",
    "/zh/algo/dynamic-programming/russian-doll-envelopes/",
    "/zh/algo/dynamic-programming/edit-distance/",
    "/zh/algo/dynamic-programming/longest-common-subsequence/",
    "/zh/algo/dynamic-programming/diff-in-two-strings/",
    "/zh/algo/dynamic-programming/maximum-subarray/",
    "/zh/algo/dynamic-programming/maximum-sum-circular-subarray/",
    "/zh/algo/dynamic-programming/minimum-path-sum/",
    "/zh/algo/dynamic-programming/triangle/",
    "/zh/algo/dynamic-programming/target-sum/",
    "/zh/algo/dynamic-programming/knapsack1/",
    "/zh/algo/dynamic-programming/knapsack2/",
    "/zh/algo/dynamic-programming/knapsack3/",
    "/zh/algo/dynamic-programming/interleaving-string/",
    "/zh/algo/dynamic-programming/stock-problem-summary/",
    "/zh/algo/dynamic-programming/house-robber/",
    "/zh/algo/dynamic-programming/greedy-dp/",
    "/zh/algo/problem-set/dynamic-programming/",

    # ── Chapter 4: Other Techniques ───────────────────────────────────────────
    "/zh/algo/essential-technique/greedy-2/",
    "/zh/algo/problem-set/greedy/",
    "/zh/algo/essential-technique/divide-and-conquer-2/",
    "/zh/algo/practice-in-action/find-kth-largest/",
    "/zh/algo/practice-in-action/median-finder/",
    "/zh/algo/frequency-interview/interval-merging/",
    "/zh/algo/frequency-interview/interval-scheduling/",
    "/zh/algo/frequency-interview/scan-line/",
    "/zh/algo/problem-set/interval/",
    "/zh/algo/frequency-interview/trapping-rain-water/",
    "/zh/algo/frequency-interview/calculate-expression/",
    "/zh/algo/frequency-interview/find-missing-num/",
    "/zh/algo/frequency-interview/pancake-sorting/",
    "/zh/algo/frequency-interview/string-multiply/",
    "/zh/algo/frequency-interview/russian-roulette/",
    "/zh/algo/problem-set/math/",
    "/zh/algo/frequency-interview/one-line-solutions/",
    "/zh/algo/practice-in-action/bit-operation/",
    "/zh/algo/problem-set/bit-operation/",
]


# ══════════════════════════════════════════════════════════════════════════════
#  URL → FOLDER MAPPING
# ══════════════════════════════════════════════════════════════════════════════

def url_to_path(path: str) -> Path:
    """
    /zh/algo/essential-technique/algorithm-summary/
        → OUTPUT_ROOT / essential-technique / algorithm-summary.md
    """
    # Strip the /zh/algo/ prefix
    rel = path.removeprefix(LANG_PREFIX).strip("/")
    parts = rel.split("/")
    if len(parts) == 1:
        # e.g. /zh/algo/home/ → home.md
        return OUTPUT_ROOT / f"{parts[0]}.md"
    # folder/article
    folder = parts[0]
    article = parts[1] if len(parts) > 1 else "index"
    return OUTPUT_ROOT / folder / f"{article}.md"


# ══════════════════════════════════════════════════════════════════════════════
#  HTML FETCHING
# ══════════════════════════════════════════════════════════════════════════════

def fetch_html(url: str) -> str | None:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  ⚠️  fetch error: {e}")
        return None


# ══════════════════════════════════════════════════════════════════════════════
#  CONTENT EXTRACTION  → clean Markdown
# ══════════════════════════════════════════════════════════════════════════════

def extract_article(html: str, url: str) -> str:
    soup = BeautifulSoup(html, "html.parser")

    # ── Remove noisy elements ─────────────────────────────────────────────────
    for tag in soup.select(
        "script, style, noscript, nav, header, footer, "
        ".ads, .banner, #header, #footer, #sidebar, "
        ".sidebar, .toc, .nav, .breadcrumb, .pagination, "
        ".share, .comment, .comments, [class*='navigation'], "
        "[class*='nav-'], [class*='-nav'], [class*='menu'], "
        "[class*='toolbar'], [class*='paywall'], [class*='vip'], "
        "[class*='subscribe'], [class*='advertisement']"
    ):
        tag.decompose()

    # ── Find article content area ─────────────────────────────────────────────
    content = None
    selectors = [
        "article",
        "main",
        "[class*='article']",
        "[class*='content']",
        "[class*='post']",
        "[class*='markdown']",
        "[class*='prose']",
    ]
    for sel in selectors:
        found = soup.select_one(sel)
        if found and len(found.get_text(strip=True)) > 200:
            content = found
            break

    if content is None:
        content = soup.body or soup

    # ── Convert to Markdown ───────────────────────────────────────────────────
    h = html2text.HTML2Text()
    h.ignore_links = False
    h.ignore_images = False
    h.ignore_emphasis = False
    h.body_width = 0          # don't wrap lines
    h.protect_links = True
    h.unicode_snob = True
    h.skip_internal_links = True

    md = h.handle(str(content))

    # ── Clean up artefacts ────────────────────────────────────────────────────
    # Remove excessive blank lines
    md = re.sub(r"\n{4,}", "\n\n\n", md)
    # Remove Next.js data/script remnants
    md = re.sub(r"!\[\]\(data:.*?\)", "", md)
    md = re.sub(r"\[!\[\].*?\]\(.*?\)", "", md)

    # ── Add source header ─────────────────────────────────────────────────────
    title_tag = soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else "Untitled"
    title = title.split("|")[0].strip()

    header = textwrap.dedent(f"""\
        # {title}

        > Source: {BASE_URL}{url}
        > Archived: labuladong.online — 算法笔记

        ---

    """)

    return header + md.strip() + "\n"


# ══════════════════════════════════════════════════════════════════════════════
#  SIDEBAR LINK DISCOVERY
# ══════════════════════════════════════════════════════════════════════════════

def discover_links(html: str) -> list[str]:
    """Extract /zh/algo/... links from sidebar navigation."""
    soup = BeautifulSoup(html, "html.parser")
    found = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith(LANG_PREFIX + "/") and href != LANG_PREFIX + "/":
            # Normalize: ensure trailing slash
            if not href.endswith("/"):
                href += "/"
            # Skip problem detail pages (too many, usually exercise sets)
            if "/problem/" in href:
                continue
            found.add(href)
    return sorted(found)


# ══════════════════════════════════════════════════════════════════════════════
#  MAIN CRAWLER
# ══════════════════════════════════════════════════════════════════════════════

def main():
    dry_run = "--dry-run" in sys.argv

    if dry_run:
        print(f"\nDRY RUN — would fetch {len(SEED_URLS)} seed URLs\n")
        for u in SEED_URLS:
            print(f"  {u}  ->  {url_to_path(u)}")
        return

    visited: set[str] = set()
    queue: list[str] = list(SEED_URLS)

    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    total_saved = 0
    total_skipped = 0
    total_errors = 0

    print(f"\n{'='*60}")
    print(f"  labuladong.online → Markdown archiver")
    print(f"  Output: {OUTPUT_ROOT}")
    print(f"  Seed URLs: {len(queue)}")
    print(f"{'='*60}\n")

    idx = 0
    while queue:
        path = queue.pop(0)
        if path in visited:
            continue
        visited.add(path)
        idx += 1

        url = BASE_URL + path
        out_path = url_to_path(path)

        print(f"[{idx:>3}] {path}")

        # Skip if already saved (resume support)
        if out_path.exists():
            print(f"       ↳ already exists, skipping")
            total_skipped += 1
            continue

        html = fetch_html(url)
        if html is None:
            total_errors += 1
            time.sleep(DELAY)
            continue

        # Discover additional URLs from navigation
        new_links = discover_links(html)
        added = 0
        for link in new_links:
            if link not in visited and link not in queue:
                queue.append(link)
                added += 1
        if added:
            print(f"       ↳ discovered {added} new links")

        # Extract and save markdown
        try:
            md = extract_article(html, path)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(md, encoding="utf-8")
            size_kb = len(md.encode("utf-8")) / 1024
            print(f"       ↳ saved {out_path.name} ({size_kb:.1f} KB)")
            total_saved += 1
        except Exception as e:
            print(f"       ↳ ❌ error: {e}")
            total_errors += 1

        time.sleep(DELAY)

    print(f"\n{'='*60}")
    print(f"  Done!")
    print(f"  Saved:   {total_saved}")
    print(f"  Skipped: {total_skipped} (already existed)")
    print(f"  Errors:  {total_errors}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
