import requests

endpoint = "http://localhost:8000/api/"

get_response = requests.post(endpoint, json={'id': 3, 'location': '32.000', 'type': 'restaurant', 'ratings': 5.5, 'attributes': 'null'})

print(get_response.json())