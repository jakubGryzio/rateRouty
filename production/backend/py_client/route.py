import requests
import json

endpoint = "http://localhost:8000/api/route/?start=20.98904,52.22511&end=21.01105,52.24427&buffer=5"

get_response = requests.get(endpoint)

print(get_response.json())