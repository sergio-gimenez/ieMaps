from flask import Flask, request
#from flask.ext.cors import CORS, cross_origin
#from flask_module import CORS, cross_origin
from flask_cors import cross_origin
import json
from ieMaps import ieMaps


def frontAddressQueryToBackend(queryJSON):
    return json.loads(queryJSON)


json_i = [{}]
json_i[0]['start_adress'] = "Casa de les punxes"
json_i[0]['end_adress'] = "La Pau"
json_i[0]['time_of_search'] = "2019-10-14 15:35:02"
json_i[0]['dis'] = True
json_i[0]['ev'] = False
json_i[0]['taxi'] = False

ieMaps(frontAddressQueryToBackend(json.dumps(json_i)))

app = Flask(__name__)

@app.route('/')
@cross_origin()
def hello():
    print('during view')
    return json.dumps()

@app.teardown_request
def show_teardown(exception):
    print('after with block')

with app.test_request_context():
    print('during with block')

# teardown functions are called after the context with block exits

with app.test_client() as client:
    client.get('/')
    # the contexts are not popped even though the request ended
    print(request.path)

# the contexts are popped and teardown functions are called after
# the client with block exists

if __name__ == '__main__':
        app.run(host='0.0.0.0')
