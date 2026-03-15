"""Debug the full code-with-tabs container structure."""
import sys, io, urllib.request
from bs4 import BeautifulSoup
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

URL = "https://labuladong.online/zh/algo/essential-technique/algorithm-summary/"
req = urllib.request.Request(URL, headers={
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": "zh-CN,zh;q=0.9",
})
html = urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "replace")
soup = BeautifulSoup(html, "html.parser")

# Find the code-with-tabs container
print("=== FIRST code-with-tabs (first 2000 chars of raw HTML) ===")
tabs_div = soup.select_one(".code-with-tabs")
if tabs_div:
    raw = str(tabs_div)
    print(raw[:2000])
else:
    print("NOT FOUND")

print("\n\n=== ALL <button> elements inside first code-with-tabs ===")
if tabs_div:
    for btn in tabs_div.find_all("button"):
        print(f"  btn text={repr(btn.get_text(strip=True))} attrs={btn.attrs}")

print("\n\n=== ALL data-lang / data-language / data-tab attributes (first 10) ===")
for el in soup.find_all(attrs={"data-lang": True})[:10]:
    print(f"  <{el.name} data-lang={el.get('data-lang')} class={el.get('class')}>")
for el in soup.find_all(attrs={"data-language": True})[:10]:
    print(f"  <{el.name} data-language={el.get('data-language')} class={el.get('class')}>")
