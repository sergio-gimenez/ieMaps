import googlemaps
from taxi import getTaxiPrice
from datetime import datetime
import polyline

gmaps = googlemaps.Client(key='AIzaSyD9R2jg0AERETo2MTHyEHqQTLS06hc7sM0')

# Geocoding an address
geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# Look up an address with reverse geocoding
reverse_geocode_result = gmaps.reverse_geocode((41.3861767, 2.165358))
import pdb; pdb.set_trace()

# Request directions via public transit
now = datetime.now()
directions_result_transit = gmaps.directions("Parada de Metro la Pau",
                                     "Barcelona",
                                     mode="transit",
                                     departure_time=now)
directions_result_driving= gmaps.directions("Sydney Town Hall",
                                     "Barcelona",
                                     mode="driving",
                                     departure_time=now)

getTaxiPrice(now, polyline.decode(directions_result_transit[0]['overview_polyline']['points']))
