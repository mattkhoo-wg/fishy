from flask import Flask
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