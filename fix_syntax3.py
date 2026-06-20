import re

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix garbage after .jpg" like .jpg"BASTIA..." or .jpg"+складной"
content = re.sub(r'\.jpg\"[^,\n\]]*', '.jpg"', content)

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Syntax fixed 3.")
