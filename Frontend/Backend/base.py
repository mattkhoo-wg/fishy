from flask import Flask
import numpy as np
import getFeatures
# import tensorflow as tf
# from tensorflow import keras
import pandas as pd

# instance of flask application
app = Flask(__name__)
 
# home route that returns below text
# when root url is accessed
@app.route("/<address>")
def hello_world(address):
    data = (pd.read_csv('labeleddata - eth_illicit_features (1).csv'))
    del data['flag']
    print(data)

    # min_scaler = np.array(pd.read_csv('min.csv'))
    # features = getFeatures.get_features_from_address(address)
    # new_features = np.array(features[1:])
    # final = []
    # for i in range(0,len(max_scaler)):
    #     max = max_scaler[i]
    #     min = min_scaler[i]
    #     print('wtf')
    #     print(max)
    #     diff = max - min
    #     final.append((new_features[i] - min)/diff)
    # df = pd.DataFrame(np.array(final))
    # print(df.shape)

    # model = tf.keras.models.load_model('my_h5_model.h5')
    # result = model.predict(df.T)
    return str("hi")
 
if __name__ == '__main__':
    app.run(debug=True, port=3001)
