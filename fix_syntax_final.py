import re

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '"mainImage":' in line and '/1.jpg' in line:
        match = re.search(r'/images/ozon/(\d+)/1.jpg', line)
        if match:
            lines[i] = f'      "mainImage": "/images/ozon/{match.group(1)}/1.jpg",\n'
    elif '/1.jpg' in line and '"imageUrls":' not in line:
        match = re.search(r'/images/ozon/(\d+)/1.jpg', line)
        if match:
            lines[i] = f'        "/images/ozon/{match.group(1)}/1.jpg"\n'

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Final syntax fix done.")
