from flask import Flask
<<<<<<< HEAD
import getFeatures
# instance of flask application
app = Flask(__name__)
 
# home route that returns below text
# when root url is accessed
@app.route("/<address>")
def hello_world(address):
    features = getFeatures.get_features_from_address('{address}')

    return str(features)
 
if __name__ == '__main__':
    app.run(debug=True, port=3001)
=======
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
>>>>>>> 4e26d8b320ea2abecf2c1b6065a180bc7397e6ca
