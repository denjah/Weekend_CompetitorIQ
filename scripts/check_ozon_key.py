import os
import requests
import json
from dotenv import load_dotenv

# Загружаем переменные из .env.local
load_dotenv('../app/.env.local')

API_KEY = os.getenv('OZON_API_KEY')
# Для Ozon API обязательно нужен Client-Id
CLIENT_ID = os.getenv('OZON_CLIENT_ID')

if not API_KEY or not CLIENT_ID:
    print("❌ Ошибка: В .env.local не найден OZON_API_KEY или OZON_CLIENT_ID")
    print("Убедись, что добавил обе переменные в d:\\!PROJECTS\\CONCURENTS\\app\\.env.local")
    exit(1)

headers = {
    'Client-Id': CLIENT_ID,
    'Api-Key': API_KEY,
    'Content-Type': 'application/json'
}

print("🔄 Проверяем доступ ключа к списку товаров...")

# Проверка 1: Можем ли мы читать товары
url_list = "https://api-seller.ozon.ru/v2/product/list"
payload_list = {
    "filter": {
        "visibility": "ALL"
    },
    "limit": 5,
    "last_id": "",
    "sort_dir": "DESC"
}

response = requests.post(url_list, headers=headers, json=payload_list)

if response.status_code == 200:
    data = response.json()
    items = data.get('result', {}).get('items', [])
    print(f"✅ Успех! Ключ рабочий. Найдено товаров в ответе: {len(items)}")
    print("Мы можем вытянуть всю инфу по товарам для нашего портала.")
elif response.status_code == 403:
    print("❌ Ошибка 403: Доступ запрещен. Ключ недействителен или имеет неверные права.")
else:
    print(f"⚠️ Ошибка {response.status_code}: {response.text}")

# Проверка 2: Аналитика (доступна не на всех ключах)
print("\n🔄 Проверяем доступ к аналитике...")
url_analytics = "https://api-seller.ozon.ru/v1/analytics/data"
payload_analytics = {
    "date_from": "2026-06-01",
    "date_to": "2026-06-24",
    "metrics": ["revenue", "ordered_units"],
    "dimension": ["sku"],
    "limit": 5,
    "offset": 0
}

response_analytics = requests.post(url_analytics, headers=headers, json=payload_analytics)

if response_analytics.status_code == 200:
    print("✅ Успех! Ключ дает доступ к аналитике (продажи, метрики).")
else:
    print(f"⚠️ Аналитика недоступна по этому ключу (Ошибка {response_analytics.status_code}).")
