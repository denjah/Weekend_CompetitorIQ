import re

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace trailing broken strings like: .jpg"+складной", or .jpg"+135+x+65+см"
content = re.sub(r'\.jpg"\+[^",\n\]]*', '.jpg"', content)

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Syntax fixed.")
