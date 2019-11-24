import googlemaps
from datetime import datetime, timedelta
import polyline
import json
from constants import Constants

from airquality import get_airquality    ##Ben files
from get_weather import get_weather
from footprint_calculation import get_footprint

from closestParkingSpot import getClosestBikeParking, getClosestCarParking #Xex files
from closestStation import getClosestSation
from getStationsNoAdapted import isLineAdapted

gmaps = googlemaps.Client(key='AIzaSyD9R2jg0AERETo2MTHyEHqQTLS06hc7sM0')

def ieMaps(json_i):
    
    dis = json_i[0]['dis']
    ev = json_i[0]['ev']
    taxi = json_i[0]['taxi']

    start_adress = json_i[0]['start_adress']
    end_adress = json_i[0]['end_adress']
    date_of_search = datetime.strptime(json_i[0]['time_of_search'], "%Y-%m-%d %H:%M:%S")

    transport_dict = {}

    for transportmode in Constants.list_of_transports:

        params_dict = {}

        directions_result = gmaps.directions(start_adress,
                                        end_adress,
                                        mode=transportmode,
                                        departure_time=date_of_search)

        start_location = gmaps.geocode(start_adress)
        end_location = gmaps.geocode(end_adress)

        ts_from = date_of_search - timedelta(days=1)
        ts_to = date_of_search
        start_lat = start_location[0]['geometry']['location']['lat']
        start_lon = start_location[0]['geometry']['location']['lng']
        end_lat = end_location[0]['geometry']['location']['lat']
        end_lon = end_location[0]['geometry']['location']['lng']
        start_description = start_location[0]['formatted_address']
        end_description = end_location[0]['formatted_address']
        distance = directions_result[0]['legs'][0]['distance']['text']
        duration = directions_result[0]['legs'][0]['duration']['text']

        co2_trip, co2_trip_car, price, petrol_car_price = get_footprint(start_lat, start_lon, end_lat, end_lon, transportmode, ev, taxi)
        pollution_index = get_airquality(start_lat, start_lon, end_lat, end_lon)
        temperature, precipitation_percentage, precipitation_intensity = get_weather(end_lat, end_lon, ts_from, ts_to)

        params_dict['mode'] = transportmode
        params_dict['start_description'] = start_description
        params_dict['end_description'] = end_description
        params_dict['distance'] = distance
        params_dict['time'] = duration
        params_dict['start_lat'] = start_lat
        params_dict['start_lon'] = start_lon
        params_dict['end_lat'] = end_lat
        params_dict['end_lon'] = end_lon
        params_dict['warnings'] = []

        params_dict['co2_trip'] = co2_trip
        params_dict['price'] = price
        if (transportmode != Constants.driving):
            params_dict['co2_trip_car'] = co2_trip_car
            params_dict['petrol_car_price'] = petrol_car_price

        params_dict['pollution_index'] = pollution_index

        params_dict['temperature'] = temperature
        params_dict['precipitation_percentage'] = precipitation_percentage
        params_dict['precipitation_intensity'] = precipitation_intensity

        boleano = True

        if transportmode == Constants.public_transport and dis:
            for stp in directions_result[0]['legs'][0]['steps']:
                if stp['travel_mode']== Constants.public_transport:
                    origin = stp['start_location']
                    final = stp['end_location']
                    start_location = gmaps.reverse_geocode((origin['lat'], origin['lng']))
                    end_location = gmaps.reverse_geocode((origin['lat'], origin['lng']))
                    boleano = boleano and isLineAdapted(start_location['place_id'],end_location['place_id'])

        if boleano == False:
            params_dict['warnings'].append("There is one line of the Metro step that is not adapted for PwRM")

        if transportmode == Constants.driving and ev:
            v = getClosestSation(end_lat, end_lon)
            params_dict['closes_charging_station'] = (v['lat'], v['lon'])

        if transportmode == Constants.driving and dis:
            v = getClosestCarParking(end_lat, end_lon)
            params_dict['closes_parking_for_PRM'] = (v['lat'], v['lon'])

        if transportmode == Constants.bike:
            v = getClosestBikeParking(end_lat, end_lon)
            params_dict['closes_parking_for_bike'] = (v['lat'], v['lon'])

        transport_dict[transportmode] = params_dict
    jayson = json.dumps(transport_dict)
    print(jayson)
    return jayson
