import re
import os

files = [
    'app/src/features/ozon-analytics/ui/OzonOverviewSection.tsx',
    'app/src/features/ozon-analytics/ui/ProductCardsTable.tsx'
]

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace width: 40, height: 40 with width: 45, height: 60
        content = content.replace("width: 40, height: 40", "width: 45, height: 60, minWidth: 45")
        
        # Add onError to img
        # find <img ... src={p.mainImage} ... />
        content = re.sub(
            r'(<img[^>]*src=\{p\.mainImage\}[^>]*)(\/?>)',
            r'\1 onError={(e) => { e.currentTarget.src = "https://placehold.co/300x400/1E293B/FFFFFF?text=No+Photo" }} \2',
            content
        )

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Images aspect ratio and fallback fixed.")
