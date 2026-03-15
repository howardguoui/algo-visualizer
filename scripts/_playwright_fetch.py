"""
scripts/_playwright_fetch.py
----------------------------
Playwright-based HTML fetcher that clicks preferred code-language tabs
before returning the page HTML. One Chromium browser is kept alive
across all pages to amortise startup cost.

Setup (one-time):
    pip install playwright
    playwright install chromium

Usage in crawlers:
    python scripts/fetch_labuladong.py    --force --playwright
    python scripts/fetch_labuladong_en.py --force --playwright
"""

# Programming language preference order — first available wins per page.
PREFER_LANGS = ["Python", "JavaScript", "Go", "C++"]


class PlaywrightSession:
    """
    Context manager that keeps a single headless Chromium instance alive
    for the duration of a crawl session.

    Example
    -------
    with PlaywrightSession(HEADERS) as session:
        html = session.fetch("https://labuladong.online/...")
    """

    def __init__(self, headers: dict[str, str], headless: bool = True) -> None:
        self._headers  = headers
        self._headless = headless
        self._pw_cm    = None   # the sync_playwright() context manager
        self._pw       = None   # the Playwright object returned by __enter__
        self._browser  = None
        self._page     = None

    # ── lifecycle ────────────────────────────────────────────────────────────

    def __enter__(self) -> "PlaywrightSession":
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            raise ImportError(
                "Playwright is not installed.\n"
                "  pip install playwright\n"
                "  playwright install chromium"
            )

        # sync_playwright() returns a context manager; keep both references
        self._pw_cm   = sync_playwright()
        self._pw      = self._pw_cm.__enter__()
        self._browser = self._pw.chromium.launch(headless=self._headless)

        # Build extra headers (exclude User-Agent — set via new_context instead)
        extra = {k: v for k, v in self._headers.items() if k != "User-Agent"}
        ctx   = self._browser.new_context(
            user_agent=self._headers.get("User-Agent", ""),
            extra_http_headers=extra,
        )
        self._page = ctx.new_page()
        return self

    def __exit__(self, *args: object) -> None:
        try:
            if self._browser:
                self._browser.close()
        finally:
            if self._pw_cm:
                self._pw_cm.__exit__(*args)

    # ── public API ───────────────────────────────────────────────────────────

    def fetch(self, url: str, timeout: int = 30) -> str | None:
        """
        Navigate to *url*, click the preferred language tab in every
        `.code-with-tabs` container on the page, then return the full HTML.

        Tab-click strategy
        ------------------
        labuladong renders each `.code-with-tabs` as an independent Radix UI
        Tabs widget — clicking Python in one does NOT auto-switch the others.
        We therefore iterate through ALL matching tabs for the chosen language.

        Returns None on any error.
        """
        page = self._page
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=timeout * 1000)
            # Wait for React hydration so Radix tab buttons become interactive
            page.wait_for_timeout(900)

            # Walk through language preferences; click all tabs for first match
            for lang in PREFER_LANGS:
                tabs = page.locator(".code-with-tabs [role='tab']").filter(
                    has_text=lang
                )
                n = tabs.count()
                if n == 0:
                    continue

                for i in range(n):
                    try:
                        tabs.nth(i).click()
                        page.wait_for_timeout(80)   # let each Radix panel swap
                    except Exception:
                        pass

                page.wait_for_timeout(300)  # final settle for React state
                break

            return page.content()

        except Exception as e:
            print(f"  Playwright error: {e}")
            return None
