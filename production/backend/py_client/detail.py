import requests

endpoint = "http://localhost:8000/api/v1/poi/1"

get_response = requests.get(endpoint)

print(get_response.json())