import requests

endpoint = "http://localhost:8000/api/poi/update/2/"

data = {
    "type": "fast-food",
    "location": "24.89, 54.15"
}

get_response = requests.put(endpoint, json=data)

print(get_response.json())