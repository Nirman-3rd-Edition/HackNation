from flask import Flask, render_template, send_file, jsonify
import requests

app = Flask(__name__, template_folder="C:\\Users\\Shreyash Mohapatra\\Desktop\\NIRMAN", static_folder="static")

@app.route("/get-location")
def get_location():
    # Make a request to your Express server to fetch the coordinates
    response = requests.get(' https://50e4-49-249-101-106.ngrok-free.app/get-location')
    data = response.json()
    return jsonify(data)

@app.route("/")
def chatbot_page():
    return render_template("index.html")

@app.route('/404')
def main_404_page():
    return send_file('404.html')

@app.route('/main')
def main_page():
    return send_file('main.html')

@app.route('/loginmail')
def login_mail_page():
    return send_file('loginmail.html')

@app.route('/loginmobile')
def login_mobile_page():
    return send_file('loginmobile.html')

@app.route('/register')
def signup_page():
    return send_file('register.html')

@app.route('/plan')
def pricing_page():
    return send_file('plan.html')

@app.route('/qrcode')
def documentation_page():
    return send_file('qrcode.html')

if __name__ == "__main__":
    app.run(debug=True)
