import requests

endpoint = "http://localhost:8000/api/poi/delete/1/"

get_response = requests.delete(endpoint)

print(get_response)