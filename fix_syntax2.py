import re

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix double quotes: .jpg"" -> .jpg"
content = content.replace('.jpg"",', '.jpg",')
content = content.replace('.jpg""', '.jpg"')

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Syntax fixed 2.")
