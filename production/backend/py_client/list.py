import requests

auth_endpoint = "http://localhost:8000/api/v1/login/"

auth_response = requests.post(auth_endpoint, json={"username":"jakubgryzio", "password": "Gryzli!23"})

print(auth_response.json())

""" if auth_response.status_code == 200:
    token = auth_response.json()['token']
    headers = {
        'Authorization': f"Bearer {token}"
    }
    endpoint = "http://localhost:8000/api/v1/poi/"

    get_response = requests.get(endpoint, headers=headers)

    print(get_response.json()) """