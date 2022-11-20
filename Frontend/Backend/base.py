from flask import Flask
import getFeatures
import tensorflow as tf
from tensorflow import keras 
# instance of flask application
app = Flask(__name__)
 
# home route that returns below text
# when root url is accessed
@app.route("/<address>")
def hello_world(address):
    
    features = getFeatures.get_features_from_address(address)
    print(features)
    return str(features)

    model = tf.keras.models.load_model('model')
 
if __name__ == '__main__':
    app.run(debug=True, port=3001)
