import requests
import json

API_KEY = 'AIzaSyBQeJmi6jy-mkhmC3tHeLZjwpc-zCpyT2U'
coordinates = [20.350381, 85.805777]
SEARCH_RADIUS = 20000
QUERY = 'ev charging station'
url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={coordinates[0]},{coordinates[1]}&radius={SEARCH_RADIUS}&keyword={QUERY}&key={API_KEY}'
response = requests.get(url)
data = json.loads(response.text)

charging_stations = []
for result in data['results']:
    name = result['name']
    place_id = result['place_id']
    lat = result['geometry']['location']['lat']
    lng = result['geometry']['location']['lng']
    charging_stations.append({'name': name, 'latitude': lat, 'longitude': lng})

# Write the data into a JSON file
with open('StationData.json', 'w') as f:
    json.dump(charging_stations, f, indent=2)