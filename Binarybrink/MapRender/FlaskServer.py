from flask import Flask, jsonify, render_template_string
import googlemaps
import requests
import json

news_api_key = "ed4c2cfbb76d4c38a1e64c67f07bb3a2"

GMAPS_API_KEY = 'AIzaSyBQeJmi6jy-mkhmC3tHeLZjwpc-zCpyT2U'
map_client = googlemaps.Client(GMAPS_API_KEY)

app = Flask(__name__)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
@app.route("/")
def new_born():
    return "!"

@app.route('/maps')
def home():
    # Fetch station data from /stationdata route
    station_data_response = requests.get('http://127.0.0.1:5000/stationdata')
    station_data = json.loads(station_data_response.text)

    # Use the fetched data in the HTML template
    html_code = f"""
        <!DOCTYPE html>
        <html>
        <head>
        <title>Charging Station Map</title>
        <style>
            #map {{
                height: 100%;
            }}
            html,
            body {{
                height: 100%;
                margin: 0;
                padding: 0;
            }}
            #station-select {{
                position: absolute;
                font-size: 18px;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: normal;
                top: 9px;
                left: 200px;
                padding: 10px;
                z-index: 99;
                border-radius: 2px;
                border: 1px solid rgba(0, 0, 0, 0.127);
            }}
        </style>
        </head>
        <body>
        <div id="map"></div>
        <script>
            let map;
            let markers = [];
            let directionsService;
            let directionsRenderer;
            let userMarker;

            async function initMap() {{
                map = new google.maps.Map(document.getElementById('map'), {{
                    center: {{ lat: 20.2817736, lng: 85.8007684 }},
                    zoom: 15,
                }});

                directionsService = new google.maps.DirectionsService();
                directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(map);

                // Try to get user's current location
                if (navigator.geolocation) {{
                    navigator.geolocation.getCurrentPosition(position => {{
                        const userLocation = {{
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }};
                        map.setCenter(userLocation);

                        // Add a blue marker for the user's current location
                        userMarker = new google.maps.Marker({{
                            position: userLocation,
                            map: map,
                            icon: {{
                                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                scaledSize: new google.maps.Size(40, 40),
                            }},
                            title: 'Your Location'
                        }});
                        markers.push(userMarker);
                    }}, error => {{
                        console.error('Error getting user location:', error);
                    }});
                }}

                // Add markers for all locations
                const stationData = {json.dumps(station_data)};
                stationData.forEach(location => {{
                    const marker = new google.maps.Marker({{
                        position: {{ lat: location.latitude, lng: location.longitude }},
                        map: map,
                        title: location.name
                    }});
                    markers.push(marker);

                    // Handle marker click event
                    marker.addListener('click', () => {{
                        calculateAndDisplayRoute(location.latitude, location.longitude);
                    }});
                }});

                const stationSelect = document.createElement("select");
                stationSelect.id = "station-select";
                stationSelect.innerHTML = `
                    <option value="">Select a location</option>
                    <option value="currentLocation">Your Current Location</option>
                    <option value="allStations">All Charging Stations</option>
                `;
                document.body.appendChild(stationSelect);

                stationSelect.addEventListener("change", () => {{
                    const selectedOption = stationSelect.value;

                    markers.forEach(marker => {{
                        marker.setMap(null);
                    }});
                    markers = [];

                    if (selectedOption === "currentLocation") {{
                        // Show predefined location for "Your Current Location"
                        if (navigator.geolocation) {{
                            navigator.geolocation.getCurrentPosition(position => {{
                                const userLocation = {{
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                }};
                                map.setCenter(userLocation);

                                // Add a blue marker for the user's current location
                                userMarker = new google.maps.Marker({{
                                    position: userLocation,
                                    map: map,
                                    icon: {{
                                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                        scaledSize: new google.maps.Size(40, 40),
                                    }},
                                    title: 'Your Location'
                                }});
                                markers.push(userMarker);
                            }}, error => {{
                                console.error('Error getting user location:', error);
                            }});
                        }}
                    }} else if (selectedOption === "allStations") {{
                        // Add markers for all locations
                        stationData.forEach(location => {{
                            const marker = new google.maps.Marker({{
                                position: {{ lat: location.latitude, lng: location.longitude }},
                                map: map,
                                title: location.name
                            }});
                            markers.push(marker);

                            // Handle marker click event
                            marker.addListener('click', () => {{
                                calculateAndDisplayRoute(location.latitude, location.longitude);
                            }});
                        }});

                        // Add back the user marker
                        if (userMarker) {{
                            userMarker.setMap(map);
                            markers.push(userMarker);
                        }}
                    }}
                    // Add other conditions for different locations if needed
                }});

                map.addListener('click', (event) => {{
                    calculateAndDisplayRoute(event.latLng.lat(), event.latLng.lng());
                }});
            }}

            function calculateAndDisplayRoute(destinationLat, destinationLng) {{
                if (markers.length > 0) {{
                    const request = {{
                        origin: userMarker.getPosition(),  // Use the user's marker as the origin
                        destination: {{ lat: destinationLat, lng: destinationLng }},
                        travelMode: 'DRIVING'
                    }};

                    directionsService.route(request, (result, status) => {{
                        if (status === 'OK') {{
                            directionsRenderer.setDirections(result);
                        }} else {{
                            console.error('Error calculating route:', status);
                        }}
                    }});
                }}
            }}

            // Load Google Maps API and initialize the map
            function loadMapScript() {{
                const script = document.createElement('script');
                script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBQeJmi6jy-mkhmC3tHeLZjwpc-zCpyT2U&callback=initMap';
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
            }}

            loadMapScript();
        </script>
        </body>
        </html>
    """

    return render_template_string(html_code)

@app.route('/stationdata')
def data():
    coordinates = [20.350381, 85.805777]
    SEARCH_RADIUS = 20000
    QUERY = 'ev charging station'
    url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={coordinates[0]},{coordinates[1]}&radius={SEARCH_RADIUS}&keyword={QUERY}&key={GMAPS_API_KEY}'
    response = requests.get(url)
    data = json.loads(response.text)

    charging_stations = []
    for result in data['results']:
        name = result['name']
        place_id = result['place_id']
        lat = result['geometry']['location']['lat']
        lng = result['geometry']['location']['lng']
        charging_stations.append({'name': name, 'latitude': lat, 'longitude': lng})

    return jsonify(charging_stations)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)