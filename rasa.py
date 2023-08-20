# How to run rasa on server : rasa run --enable-api -m 20230820-145032-crabby-quiver.tar.gz
import requests
import json
import urllib.parse
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_intent(user_input):
    url = "http://localhost:5005/model/parse"
    obj = {"text": user_input}
    response = requests.post(url, data=json.dumps(obj))
    text = response.json()
    text =  {"intent":text['intent']['name']}
    return  json.loads(json.dumps(text)) 

@app.route('/get_intent',methods=['POST'])
def return_intent():
    user_input = request.json['user_input']
    return get_intent(user_input)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010)