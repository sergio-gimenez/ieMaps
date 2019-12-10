from flask import Flask, request
from flask_cors import cross_origin
import json
from ieMaps import ieMaps
from flask import request


# Function to pass the form query from the view to the model
def frontAddressQueryToBackend(queryJSON):
    return json.loads(queryJSON)


json_i = [{}]  # Initialize JSON file
app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def hello():

    # Test POST
    # curl localhost:5000 -d "startAddress=Edificio+B3+-+Campus+Nord+UPC+1-3,
    # +Carrer+de+Jordi+Girona,+08034+Barcelona&endAddress=Plaça+Catalunya,
    # +Barcelona&dayOfSearch=2019-12-10+23:00:00&dis=True&taxi=False&ev=True"

    if request.method == 'POST':
        json_i[0]['start_adress'] = request.form['startAddress']
        json_i[0]['end_adress'] = request.form['endAddress']
        json_i[0]['time_of_search'] = request.form['dayOfSearch']
        json_i[0]['dis'] = request.form['dis']
        json_i[0]['taxi'] = request.form['taxi']
        json_i[0]['ev'] = request.form['ev']

        return ieMaps(frontAddressQueryToBackend(json.dumps(json_i)))


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
