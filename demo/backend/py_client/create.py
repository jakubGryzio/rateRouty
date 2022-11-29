import requests

auth_endpoint = "http://localhost:8000/api/v1/auth/"

auth_response = requests.post(auth_endpoint, json={"username":"jg", "password": "Gryzli!23"})

if auth_response.status_code == 200:
    token = auth_response.json()['token']
    headers = {
        'Authorization': f"Bearer {token}"
    }
    data = {
            "guid": 999000,
            "value": "3",
        }
    endpoint = "http://localhost:8000/api/v1/rating/create/"

    get_response = requests.post(endpoint, headers=headers, json=data)

    print(get_response.json())