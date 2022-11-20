from flask import Flask
import numpy as np
import getFeatures
import tensorflow as tf
from tensorflow import keras
import numpy as np 
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# instance of flask application
app = Flask(__name__)
 
# home route that returns below text
# when root url is accessed
def get_transform_model():
    df = pd.read_csv('labeleddata - eth_illicit_features (1).csv')
    X = df.drop(['flag'], axis=1)
    norm = MinMaxScaler().fit(X)
    return norm

@app.route("/<address>")
def hello_world(address):
    features = getFeatures.get_features_from_address(address)
    new_features = np.array(features[1:])
    new_features = new_features.astype(np.float)
    norm = get_transform_model()
    df_final = pd.DataFrame(new_features)
    X = norm.transform(df_final.T)
    print('look at me!')
    #print(df_final.shape)

    model = tf.keras.models.load_model('my_h5_model.h5')
    result = model.predict(X)
    return str(result)
 
if __name__ == '__main__':
    app.run(debug=True, port=3001)
