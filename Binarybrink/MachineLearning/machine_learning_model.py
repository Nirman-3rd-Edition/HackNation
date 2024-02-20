import json
from sklearn.ensemble import RandomForestRegressor
import numpy as np
#################

#coordinates of existing charging stations....jo ki pehle se available hai
charging_stations = {
    "Station 1": (25, -70),
    "Station 2": (-40, 60),
    "Station 3": (80, -10),
    "Station 4": (-90, -20),
    "Station 5": (10, 90),
    "Station 6": (-50, -80)
}

logged_requests = []
ml_model = RandomForestRegressor() ####calling rand forest reg

def euclidean_distance(coord1, coord2):
    return np.sqrt((coord1[0] - coord2[0]) ** 2 + (coord1[1] - coord2[1]) ** 2)

def find_closest_station(user_coords):
    closest_station = None
    closest_distance = float('inf')
    
    for station, coords in charging_stations.items():
        distance = euclidean_distance(user_coords, coords)
        if distance < closest_distance:
            closest_station = station
            closest_distance = distance
    
    return closest_station, closest_distance

def log_request(user_coords, closest_station, closest_distance):
    if closest_distance > 5:
        logged_requests.append({'user_coords': user_coords, 'new_station_coords': charging_stations[closest_station]})
        return True
    return False

### yaha pe load karna h json file ko, train karne k liyee
def load_data_from_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

#json me jo pehle se defined hai usko read krna hai
def prepare_data_for_training(data):
    X = np.array([entry['user_coords'] for entry in data])
    y = np.array([entry['new_station_coords'] for entry in data])
    return X, y

#for loaoading and prepare generated data for training
json_data = load_data_from_json('C:/Users/aryan/Desktop/project_triathon_beta/training_data_with_constraint.json')
X_train, y_train = prepare_data_for_training(json_data)
ml_model.fit(X_train, y_train)
print(ml_model.n_estimators)
print("Model trained successfully!")

#ek loop banaya hai jo ki input lega in form of co- ordinates...
###### filhal k liye terminal se hi legaa
while True:
    user_input = input("Enter user coordinates (latitude, longitude) or 'exit' to stop: ")
    if user_input.lower() == 'exit':
        break
    
    try:
        user_coords = tuple(map(float, user_input.split(',')))
        closest_station, closest_distance = find_closest_station(user_coords)
        
        print(f"closest charging station to user coordinates: {closest_station}")
        print(f"distance to {closest_station}: {closest_distance}")
        
        if log_request(user_coords, closest_station, closest_distance):
            suggestions = ml_model.predict(np.array([user_coords]))  # Predict for user coordinates
            print(f"sequest logged for ML.")
            print(f"suggestions for new charging station locations based on logged requests: {suggestions}")
        else:
            print("No logged requests to make suggestions.")
            
    except ValueError:
        print("invalid input...please enter latitude and longitude separated by a comma.")
