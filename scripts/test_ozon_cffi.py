from curl_cffi import requests
import sys

url = "https://www.ozon.ru/product/177834253"
try:
    resp = requests.get(url, impersonate="chrome110", timeout=15)
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
