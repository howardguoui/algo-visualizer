"""Quick smoke-test for the extraction pipeline on one live article."""
import sys, io, urllib.request
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from _extractor import extract_article

URL  = "https://labuladong.online/zh/algo/essential-technique/algorithm-summary/"
PATH = "/zh/algo/essential-technique/algorithm-summary/"

req  = urllib.request.Request(URL, headers={
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": "zh-CN,zh;q=0.9",
})
html = urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "replace")
md   = extract_article(html, PATH, archive_label="labuladong.online — 算法笔记")

# Print first 3 KB to inspect
print(md[:3000])
print("\n\n--- CHECKS ---")
print("¶ count      :", md.count("¶"))
print("```java      :", md.count("```java"))
print("```cpp       :", md.count("```cpp"))
print("```python    :", md.count("```python"))
print("![           :", md.count("!["))          # images
print("CC++Go lines :", sum(1 for l in md.splitlines()
                            if "CC++Go" in l or "JavaJavaScript" in l))
