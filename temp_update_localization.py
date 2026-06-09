import re
from pathlib import Path

root = Path('.')
changed = []
html_files = list(root.glob('*.html'))
for path in html_files:
    text = path.read_text(encoding='utf-8')
    new = text
    new = re.sub(r'(?<=>)\$(?=\d)', '₹', new)
    new = new.replace('Price ($)', 'Price (₹)')
    new = new.replace('Delivery Fee ($)', 'Delivery Fee (₹)')
    new = new.replace('fa-dollar-sign', 'fa-indian-rupee-sign')
    new = new.replace('Stackly.com', 'Stackly.in')
    new = new.replace('USDA Organic', 'FSSAI Organic')
    new = new.replace('USDA certified organic', 'FSSAI certified organic')
    new = new.replace('local farms', 'Tamil Nadu farms')
    new = new.replace('Local Farms', 'Tamil Nadu Farms')
    new = new.replace('same-day delivery in most metropolitan areas', 'same-day delivery across major Tamil Nadu cities')
    if new != text:
        path.write_text(new, encoding='utf-8')
        changed.append(str(path))

js_path = root / 'js' / 'animations.js'
if js_path.exists():
    text = js_path.read_text(encoding='utf-8')
    new = text
    new = new.replace("prefix: '$'", "prefix: '₹'")
    new = new.replace("minEl.textContent = '$' + Math.round(values[0])", "minEl.textContent = '₹' + Math.round(values[0])")
    new = new.replace("maxEl.textContent = '$' + Math.round(values[1])", "maxEl.textContent = '₹' + Math.round(values[1])")
    if new != text:
        js_path.write_text(new, encoding='utf-8')
        changed.append(str(js_path))

print('changed', changed)
