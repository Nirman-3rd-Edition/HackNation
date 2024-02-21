from flask import Flask, request
import json
from flask_cors import CORS
import numpy as np
from joblib import load
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)
# Load the pre-trained LSTM model
model = load_model('model.h5')

scaler = load('minmax_scaler.joblib')

@app.route('/', methods=['GET', 'POST'])
def predict_next_days_api():
    try:
        data = np.random.rand(50, 1)

        scaled_data = scaler.transform(data)
        num_days = int(request.args.get('num_days', default=21))

        custom_data_reshaped = np.reshape(scaled_data, (1, 50, 1))
        predictions = []

        for _ in range(num_days):
            next_day_prediction = model.predict(custom_data_reshaped)
            predictions.append(next_day_prediction[0, 0])
            custom_data_reshaped = np.concatenate(
                (custom_data_reshaped[:, 1:, :], np.reshape(next_day_prediction, (1, 1, 1))),
                axis=1
            )
        predictions = scaler.inverse_transform([predictions])
        predictions = np.floor(predictions)
        dir = {}
        day= 1
        for pred in predictions[0]:
            dir[f'Day{day}'] = pred
            day+=1
        return json.dumps(dir)

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
