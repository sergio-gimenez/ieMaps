from flask import Flask, request
#from flask.ext.cors import CORS, cross_origin
#from flask_module import CORS, cross_origin
from flask_cors import cross_origin
import json
from ieMaps import ieMaps
from initial_form import Initialform
from flask import request



def frontAddressQueryToBackend(queryJSON):
    return json.loads(queryJSON)

json_i = [{}]
json_i[0]['start_adress'] = Initialform.startAddress
json_i[0]['end_adress'] = Initialform.endAddress
json_i[0]['time_of_search'] = Initialform.dayOfSearch
json_i[0]['dis'] = Initialform.dis
json_i[0]['ev'] = Initialform.ev
json_i[0]['taxi'] = Initialform.taxi

json_to_send_to_lady_lax = ieMaps(frontAddressQueryToBackend(json.dumps(json_i)))

app = Flask(__name__) 

@app.route('/', methods = ['GET', 'POST'])
@cross_origin()
def hello():

	#Test POST
	# curl -d "start_address=Edificio+B3+-+Campus+Nord+UPC+1-3,+Carrer+de+Jordi+Girona,+08034+Barcelona&end_address=Plaça+Catalunya,+Barcelona&date=2019-12-10+23:00:00&disability=True&taxi=False&electric=True"

    if request.method == 'POST':
	json_i = [{}]
	json_i[0]['start_address'] = request.form['start_address']
	json_i[0]['end_address'] = request.form['end_address']
	json_i[0]['date'] = request.form['date']
	json_i[0]['disability'] = request.form['disability']	
	json_i[0]['taxi'] = request.form['taxi']
	json_i[0]['electric'] = request.form['electric']			
	
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
