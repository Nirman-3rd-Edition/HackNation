from flask import Flask, jsonify, render_template, request
import pandas as pd
from sklearn.linear_model import LogisticRegression

from sklearn.model_selection import train_test_split

app = Flask(__name__)

PATH ='./Fraud_sample.csv'
df = pd.read_csv(PATH)

features = df[['Time','V1', 'V2', 'V3', 'V4', 'V5', 'cc_num','zip','lat','long', 'unix_time','Amount']]
target = df['Class']
feature_columns = ['Time','V1', 'V2', 'V3', 'V4', 'V5', 'cc_num','zip','lat','long', 'unix_time','Amount']
features.columns = feature_columns

Xtrain, Xtest, Ytrain, Ytest = train_test_split(features, target, test_size=0.2, random_state=2)

LR = LogisticRegression()
LR.fit(Xtrain, Ytrain)

@app.route('/')
def index():
    return render_template('credit1.html')

@app.route('/api', methods=['POST'])
def get_prediction():
    data = request.get_json()

    # Extract data from the JSON request
    input_data = data['input_data']
    data_df = pd.DataFrame([input_data], columns=feature_columns)

    # Make prediction
    prediction = LR.predict(data_df)
    print(prediction)

    # Return the prediction as JSON
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)




