from flask import Flask
import numpy as np
import getFeatures
import pandas as pd
# import tensorflow as tf
# from tensorflow import keras 
# instance of flask application
app = Flask(__name__)
 
# home route that returns below text
# when root url is accessed
@app.route("/<address>")
def hello_world(address):
    
    features = getFeatures.get_features_from_address(address)
    # print(features)
    food = np.array(features)
    df = pd.DataFrame(food)
    print(df.shape)

    # model = tf.keras.models.load_model('model')

    return str(features)

 
if __name__ == '__main__':
    app.run(debug=True, port=3001)
