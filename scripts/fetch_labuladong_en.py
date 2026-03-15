"""
scripts/fetch_labuladong_en.py
------------------------------
Fetch the English versions of labuladong articles.

Chinese URL : https://labuladong.online/zh/algo/[section]/[article]/
English URL : https://labuladong.online/algo/en/[section]/[article]/

Output: public/labuladong/en/<section>/<article>.md

Usage
-----
    python scripts/fetch_labuladong_en.py              # skip existing files
    python scripts/fetch_labuladong_en.py --force      # re-crawl & overwrite all
    python scripts/fetch_labuladong_en.py --dry-run    # print URLs only
"""

import sys, io, time, urllib.request
from pathlib import Path

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

try:
    from bs4 import BeautifulSoup
except ImportError:
    sys.exit("pip install beautifulsoup4")
try:
    import html2text  # noqa
except ImportError:
    sys.exit("pip install html2text")

sys.path.insert(0, str(Path(__file__).parent))
from _extractor import extract_article  # noqa


# ── Configuration ─────────────────────────────────────────────────────────────

BASE_URL    = "https://labuladong.online"
EN_PREFIX   = "/algo/en"
SCRIPT_DIR  = Path(__file__).parent
OUTPUT_ROOT = SCRIPT_DIR.parent / "public" / "labuladong" / "en"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}
DELAY   = 1.0
TIMEOUT = 20


# ── Convert Chinese path → English path ──────────────────────────────────────

def zh_to_en(zh_path: str) -> str:
    """/zh/algo/section/article/ → /algo/en/section/article/"""
    return "/algo/en/" + zh_path.removeprefix("/zh/algo/")


ZH_SEED = [
    "/zh/algo/home/",
    "/zh/algo/intro/quick-learning-plan/",
    "/zh/algo/intro/beginner-learning-plan/",
    "/zh/algo/intro/how-to-learn-algorithms/",
    "/zh/algo/intro/how-to-practice/",
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
    "/zh/algo/intro/data-structure-basic/",
    "/zh/algo/intro/complexity-basic/",
    "/zh/algo/intro/sorting/",
    "/zh/algo/data-structure-basic/array-basic/",
    "/zh/algo/data-structure-basic/array-implement/",
    "/zh/algo/data-structure-basic/linkedlist-basic/",
    "/zh/algo/data-structure-basic/linkedlist-implement/",
    "/zh/algo/data-structure-basic/cycle-array/",
    "/zh/algo/data-structure-basic/skip-list-basic/",
    "/zh/algo/data-structure-basic/bitmap/",
    "/zh/algo/data-structure-basic/queue-stack-basic/",
    "/zh/algo/data-structure-basic/linked-queue-stack/",
    "/zh/algo/data-structure-basic/array-queue-stack/",
    "/zh/algo/data-structure-basic/deque-implement/",
    "/zh/algo/data-structure-basic/hashmap-basic/",
    "/zh/algo/data-structure-basic/hashtable-chaining/",
    "/zh/algo/data-structure-basic/linear-probing-key-point/",
    "/zh/algo/data-structure-basic/linear-probing-code/",
    "/zh/algo/data-structure-basic/hash-set/",
    "/zh/algo/data-structure-basic/hashtable-with-linked-list/",
    "/zh/algo/data-structure-basic/hashtable-with-array/",
    "/zh/algo/data-structure-basic/bloom-filter/",
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
    "/zh/algo/data-structure-basic/graph-terminology/",
    "/zh/algo/data-structure-basic/graph-basic/",
    "/zh/algo/data-structure-basic/graph-traverse-basic/",
    "/zh/algo/data-structure-basic/eulerian-graph/",
    "/zh/algo/data-structure-basic/graph-shortest-path/",
    "/zh/algo/data-structure-basic/graph-minimum-spanning-tree/",
    "/zh/algo/data-structure-basic/union-find-basic/",
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
    "/zh/algo/essential-technique/binary-search-framework/",
    "/zh/algo/essential-technique/binary-search-left-open/",
    "/zh/algo/essential-technique/backtrack-vs-dfs/",
    "/zh/algo/essential-technique/math-techniques-summary/",
    "/zh/algo/data-structure/reverse-linked-list-recursion/",
    "/zh/algo/data-structure/palindrome-linked-list/",
    "/zh/algo/data-structure/prefix-sum/",
    "/zh/algo/data-structure/diff-array/",
    "/zh/algo/data-structure/stack-queue/",
    "/zh/algo/data-structure/monotonic-stack/",
    "/zh/algo/data-structure/monotonic-queue/",
    "/zh/algo/data-structure/binary-tree-part1/",
    "/zh/algo/data-structure/binary-tree-part2/",
    "/zh/algo/data-structure/binary-tree-part3/",
    "/zh/algo/data-structure/serialize-and-deserialize-binary-tree/",
    "/zh/algo/data-structure/bst-part1/",
    "/zh/algo/data-structure/bst-part2/",
    "/zh/algo/data-structure/bst-part3/",
    "/zh/algo/data-structure/bst-part4/",
    "/zh/algo/data-structure/bipartite-graph/",
    "/zh/algo/data-structure/kruskal/",
    "/zh/algo/data-structure/prim/",
    "/zh/algo/data-structure/dijkstra/",
    "/zh/algo/data-structure/union-find/",
    "/zh/algo/data-structure/lru-cache/",
    "/zh/algo/data-structure/topological-sort/",
    "/zh/algo/data-structure/cycle-detection/",
    "/zh/algo/data-structure/implement-calculator/",
    "/zh/algo/data-structure/floyd/",
    "/zh/algo/data-structure/a-star/",
    "/zh/algo/practice-in-action/2d-array-traversal-summary/",
    "/zh/algo/practice-in-action/nsum/",
    "/zh/algo/practice-in-action/rabinkarp/",
    "/zh/algo/practice-in-action/advantage-shuffle/",
    "/zh/algo/practice-in-action/lowest-common-ancestor-summary/",
    "/zh/algo/practice-in-action/sudoku-nqueue/",
    "/zh/algo/practice-in-action/two-views-of-backtrack/",
    "/zh/algo/practice-in-action/generate-parentheses/",
    "/zh/algo/practice-in-action/partition-to-k-equal-sum-subsets/",
    "/zh/algo/frequency-interview/binary-search-in-action/",
    "/zh/algo/frequency-interview/random-pick-with-weight/",
    "/zh/algo/frequency-interview/interval-scheduling/",
    "/zh/algo/frequency-interview/trapping-rain-water/",
    "/zh/algo/frequency-interview/pancake-sorting/",
    "/zh/algo/frequency-interview/one-line-solutions/",
    "/zh/algo/frequency-interview/island-dfs-summary/",
    "/zh/algo/frequency-interview/print-prime-number/",
    "/zh/algo/frequency-interview/scan-line-technique/",
    "/zh/algo/frequency-interview/ugly-number-summary/",
    "/zh/algo/frequency-interview/lfu/",
    "/zh/algo/frequency-interview/exam-room/",
    "/zh/algo/frequency-interview/remove-duplicate-letters/",
    "/zh/algo/frequency-interview/perfect-rectangle/",
    "/zh/algo/frequency-interview/gas-station-greedy/",
    "/zh/algo/frequency-interview/bitwise-operation/",
    "/zh/algo/frequency-interview/probability-problem/",
    "/zh/algo/dynamic-programming/word-break/",
    "/zh/algo/dynamic-programming/longest-increasing-subsequence/",
    "/zh/algo/dynamic-programming/edit-distance/",
    "/zh/algo/dynamic-programming/longest-common-subsequence/",
    "/zh/algo/dynamic-programming/maximum-subarray/",
    "/zh/algo/dynamic-programming/minimum-path-sum/",
    "/zh/algo/dynamic-programming/target-sum/",
    "/zh/algo/dynamic-programming/knapsack1/",
    "/zh/algo/dynamic-programming/knapsack2/",
    "/zh/algo/dynamic-programming/knapsack3/",
    "/zh/algo/dynamic-programming/stock-problem-summary/",
    "/zh/algo/dynamic-programming/house-robber/",
    "/zh/algo/dynamic-programming/memo-fundamental/",
    "/zh/algo/dynamic-programming/two-views-of-dp/",
    "/zh/algo/dynamic-programming/burst-balloons/",
    "/zh/algo/dynamic-programming/egg-drop/",
    "/zh/algo/dynamic-programming/freedom-trail/",
    "/zh/algo/dynamic-programming/game-theory/",
    "/zh/algo/dynamic-programming/magic-tower/",
    "/zh/algo/dynamic-programming/regular-expression-matching/",
    "/zh/algo/computer-science/encryption-intro/",
    "/zh/algo/computer-science/authentication-vs-authorization/",
    "/zh/algo/computer-science/how-jwt-works/",
    "/zh/algo/computer-science/oauth2-explained/",
    "/zh/algo/computer-science/tls-key-exchange/",
    "/zh/algo/computer-science/sso/",
    "/zh/algo/design-pattern/singleton/",
    "/zh/algo/design-pattern/factory-method/",
    "/zh/algo/design-pattern/abstract-factory/",
    "/zh/algo/design-pattern/builder/",
    "/zh/algo/design-pattern/decorator/",
    "/zh/algo/design-pattern/adapter/",
    "/zh/algo/design-pattern/observer/",
    "/zh/algo/design-pattern/strategy/",
    "/zh/algo/other-skills/linux-shell/",
    "/zh/algo/other-skills/linux-file-system/",
    "/zh/algo/other-skills/linux-process/",
    "/zh/algo/other-skills/linux-pipeline/",
    "/zh/algo/other-skills/lsm-tree/",
]

EN_SEED = [zh_to_en(p) for p in ZH_SEED]


# ── Helpers ──────────────────────────────────────────────────────────────────

def en_path_to_file(en_path: str) -> Path:
    rel   = en_path.removeprefix(EN_PREFIX + "/").strip("/")
    parts = rel.split("/")
    if len(parts) == 1:
        return OUTPUT_ROOT / f"{parts[0]}.md"
    return OUTPUT_ROOT / parts[0] / f"{parts[1]}.md"


def fetch_html(url: str) -> str | None:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  SKIP: {e}")
        return None


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    dry_run = "--dry-run" in sys.argv
    force   = "--force"   in sys.argv

    if dry_run:
        print(f"\nDRY RUN — {len(EN_SEED)} English URLs\n")
        for p in EN_SEED:
            print(f"  {p}  ->  {en_path_to_file(p)}")
        return

    visited: set[str] = set()
    queue:   list[str] = list(EN_SEED)
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    saved = skipped = errors = 0

    print(f"\n{'='*58}")
    print(f"  labuladong English archiver  (v2 — improved extraction)")
    print(f"  Output : {OUTPUT_ROOT}")
    print(f"  Seeds  : {len(queue)}   force={force}")
    print(f"{'='*58}\n")

    idx = 0
    while queue:
        path = queue.pop(0)
        if path in visited:
            continue
        visited.add(path)
        idx += 1

        url      = BASE_URL + path
        out_path = en_path_to_file(path)

        print(f"[{idx:>3}] {path}")

        if out_path.exists() and not force:
            print(f"       -> already exists, skipping")
            skipped += 1
            continue

        html = fetch_html(url)
        if html is None:
            errors += 1
            time.sleep(DELAY)
            continue

        try:
            md = extract_article(html, path, archive_label="labuladong.online")
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(md, encoding="utf-8")
            print(f"       -> saved {out_path.name} ({len(md)//1024}KB)")
            saved += 1
        except Exception as e:
            print(f"       -> ERROR: {e}")
            errors += 1

        time.sleep(DELAY)

    print(f"\n{'='*58}")
    print(f"  Done!  Saved:{saved}  Skipped:{skipped}  Errors:{errors}")
    print(f"{'='*58}\n")


if __name__ == "__main__":
    main()
