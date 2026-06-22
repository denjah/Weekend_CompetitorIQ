import requests
import sys

url = "https://www.ozon.ru/product/177834253"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
}

try:
    resp = requests.get(url, headers=headers, timeout=10)
    print(f"Status Code: {resp.status_code}")
    if resp.status_code == 200:
        html = resp.text
        print(f"HTML Length: {len(html)}")
        if "DataDome" in html or "captcha" in html.lower() or "shield" in html.lower():
            print("WARNING: DataDome / Captcha detected in HTML!")
        else:
            print("SUCCESS: Looks like we got the real page.")
    else:
        print("Failed to get 200 OK.")
except Exception as e:
    print(f"Error: {e}")
