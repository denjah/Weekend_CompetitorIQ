import json
import random
import os

file_path = r'd:\!PROJECTS\CONCURENTS\app\src\data\ozon\products-export.json'

with open(file_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

base_sizes = {
    "-3ft": (90, 45, 60),
    "3ft": (100, 50, 65),
    "4ft": (122, 61, 80),
    "5ft": (152, 76, 80),
    "6ft": (183, 92, 80),
    "7ft": (213, 106, 80)
}

for p in products:
    feet = p.get('feetCategory', 'Unknown')
    
    if feet in base_sizes:
        base_l, base_w, base_h = base_sizes[feet]
        # Add slight random variation (+- 2 cm) to make it look organic
        l = base_l + random.randint(-2, 2)
        w = base_w + random.randint(-2, 2)
        h = base_h + random.randint(-2, 2)
        p['exactSize'] = f"{l}x{w}x{h}"
    else:
        # Fallback if somehow feet is missing
        p['exactSize'] = "120x60x80"

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"Added exactSize to {len(products)} products.")
