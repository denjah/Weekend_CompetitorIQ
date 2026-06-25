import os
import requests
import json
import codecs
import sys

# Настройка вывода для избежания проблем с кодировкой в Windows
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

API_KEY = "c7c4fa75-2ecd-4a8f-bd41-810d992edec3"
CLIENT_ID = "2717886"

headers = {
    'Client-Id': CLIENT_ID,
    'Api-Key': API_KEY,
    'Content-Type': 'application/json'
}

print("Fetching data from Ozon API...")

report_data = {}

# 1. Запрос списка товаров
try:
    res = requests.post(
        "https://api-seller.ozon.ru/v2/product/list",
        headers=headers,
        json={"filter": {"visibility": "ALL"}, "limit": 100}
    )
    if res.status_code == 200:
        items = res.json().get('result', {}).get('items', [])
        report_data['total_products_fetched'] = len(items)
        report_data['sample_products'] = items[:3]
        
        # Запрос информации о товарах по product_id
        if items:
            product_ids = [item['product_id'] for item in items[:5]]
            res_info = requests.post(
                "https://api-seller.ozon.ru/v2/product/info/list",
                headers=headers,
                json={"product_id": product_ids}
            )
            if res_info.status_code == 200:
                report_data['product_info_samples'] = res_info.json().get('result', {}).get('items', [])
            else:
                report_data['product_info_error'] = f"Status: {res_info.status_code}, Body: {res_info.text}"
    else:
        report_data['product_list_error'] = f"Status: {res.status_code}, Body: {res.text}"
except Exception as e:
    report_data['product_list_exception'] = str(e)


# 2. Запрос аналитики
try:
    res_analytics = requests.post(
        "https://api-seller.ozon.ru/v1/analytics/data",
        headers=headers,
        json={
            "date_from": "2026-06-01",
            "date_to": "2026-06-24",
            "metrics": ["revenue", "ordered_units"],
            "dimension": ["sku"],
            "limit": 10,
            "offset": 0
        }
    )
    if res_analytics.status_code == 200:
        report_data['analytics_data'] = res_analytics.json().get('result', {}).get('data', [])
    else:
        report_data['analytics_error'] = f"Status: {res_analytics.status_code}, Body: {res_analytics.text}"
except Exception as e:
    report_data['analytics_exception'] = str(e)

# 3. Запрос баланса / финансов
try:
    res_finance = requests.post(
        "https://api-seller.ozon.ru/v3/finance/transaction/list",
        headers=headers,
        json={
            "filter": {
                "date": {
                    "from": "2026-06-01T00:00:00.000Z",
                    "to": "2026-06-24T23:59:59.999Z"
                },
                "transaction_type": "all"
            },
            "page": 1,
            "page_size": 5
        }
    )
    if res_finance.status_code == 200:
        report_data['finance_data_samples'] = res_finance.json().get('result', {}).get('operations', [])
    else:
        report_data['finance_error'] = f"Status: {res_finance.status_code}, Body: {res_finance.text}"
except Exception as e:
    report_data['finance_exception'] = str(e)


with open("ozon_data_dump.json", "w", encoding="utf-8") as f:
    json.dump(report_data, f, ensure_ascii=False, indent=2)

print("Data fetched and saved to ozon_data_dump.json")
