import re

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def repl_main(m):
    id_val = m.group(1)
    between = m.group(2)
    return f'"id": "{id_val}"{between}"/images/ozon/{id_val}/1.jpg"'

content = re.sub(r'"id":\s*"(\d+)"([^}]+?)"https://placehold\.co/[^"]+"', repl_main, content)

# Для массива imageUrls, который содержит placehold.co, мы просто заменим это тоже
def repl_imageurls(m):
    # m.group(0) is the whole match of the product block
    block = m.group(0)
    id_val = re.search(r'"id":\s*"(\d+)"', block).group(1)
    block = re.sub(r'"https://placehold\.co/[^"]+"', f'"/images/ozon/{id_val}/1.jpg"', block)
    return block

content = re.sub(r'\{[^{]*?"id":\s*"\d+".*?"imageUrls":\s*\[\s*"https://placehold\.co/[^"]+"\s*\].*?\}', repl_imageurls, content, flags=re.DOTALL)

with open('app/src/features/ozon-analytics/model/real-data-dashboard.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Placeholders replaced.")
