import re

files = [
    'app/src/features/ozon-analytics/ui/OzonOverviewSection.tsx',
    'app/src/features/ozon-analytics/ui/ProductCardsTable.tsx'
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix the broken img tag syntax
    # It currently looks like: / onError={(e) => { ... }} >
    # We want it to be: onError={(e) => { ... }} />
    content = content.replace('/ onError={(e) => { e.currentTarget.src = "https://placehold.co/300x400/1E293B/FFFFFF?text=No+Photo" }} >', ' onError={(e) => { e.currentTarget.src = "https://placehold.co/300x400/1E293B/FFFFFF?text=No+Photo" }} />')
    
    # Just in case there are other variations:
    content = content.replace('/ onError={(e) => { e.currentTarget.src = "https://placehold.co/300x400/1E293B/FFFFFF?text=No+Photo" }} />', ' onError={(e) => { e.currentTarget.src = "https://placehold.co/300x400/1E293B/FFFFFF?text=No+Photo" }} />')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
