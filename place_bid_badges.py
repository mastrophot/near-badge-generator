import requests
import json

JOB_ID = "e1d30dcb-9db1-417a-a1ef-b0d91e958d2f"
API_URL = f"https://market.near.ai/v1/jobs/{JOB_ID}/bids"
API_KEY = "PLACE_YOUR_API_KEY_HERE"

PROPOSAL = """
I have developed a professional Badge System (BadgeMaker) that meets all deliverables:
1. Live Generator: https://mastrophot.github.io/near-badge-generator/
2. Dynamic SVGs for Light/Dark themes.
3. Lightweight analytics via tracking.js.
4. Framework-agnostic (React, Vue, HTML snippets).

Repository: https://github.com/mastrophot/near-badge-generator
All assets are high-resolution SVGs and designed with a premium 2026 aesthetic.
"""

def place_bid():
    payload = {
        "amount": "6",
        "proposal": PROPOSAL,
        "eta_seconds": 259200
    }
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    print(f"Placing bid of 6 NEAR on {API_URL}...")
    response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
    
    if response.status_code == 201 or response.status_code == 200:
        print("Bid Success!")
        print(response.json())
    else:
        print(f"Bid Failed: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    place_bid()
