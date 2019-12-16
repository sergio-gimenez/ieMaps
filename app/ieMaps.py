import googlemaps
from datetime import datetime, timedelta
import polyline
import json
import shutil

from constants import Constants
from tools.airquality import get_airquality
from tools.get_weather import get_weather
from tools.footprint_calculation import get_footprint
from tools.closestParkingSpot import getClosestBikeParking, getClosestCarParking
from tools.closestStation import getClosestSation
from tools.getStationsNoAdapted import isLineAdapted
import os

gmaps = googlemaps.Client(key='PUT YOUR KEY HERE')


def ieMaps(json_i):

    # Create tmp directory for temporary datasets

    if not os.path.exists(Constants.TMP_DIR):
        os.makedirs(Constants.TMP_DIR)

    # Get data from input JSON
    dis = json_i[0]['dis']
    ev = json_i[0]['ev']
    taxi = json_i[0]['taxi']
    start_adress = json_i[0]['start_adress']
    end_adress = json_i[0]['end_adress']
    date_of_search = datetime.strptime(json_i[0]['time_of_search'],
                                       "%Y-%m-%d %H:%M:%S")

    transport_dict = {}

    # Compute information for each available mean of transport
    for transportmode in Constants.list_of_transports:
        params_dict = {}

        # Request directions for selected mean of transport
        directions_result = gmaps.directions(start_adress,
                                             end_adress,
                                             mode=transportmode,
                                             departure_time=date_of_search)
        # Start-end locations
        start_location = gmaps.geocode(start_adress)
        end_location = gmaps.geocode(end_adress)
        start_lat = start_location[0]['geometry']['location']['lat']
        start_lon = start_location[0]['geometry']['location']['lng']
        end_lat = end_location[0]['geometry']['location']['lat']
        end_lon = end_location[0]['geometry']['location']['lng']
        start_description = start_location[0]['formatted_address']
        end_description = end_location[0]['formatted_address']

        # Time from within the search is going to be valid
        ts_from = date_of_search - timedelta(days=1)
        ts_to = date_of_search

        # Distance and duration from trip
        distance = directions_result[0]['legs'][0]['distance']['text']
        duration = directions_result[0]['legs'][0]['duration']['text']

        # Get footprint of the trip for the current mean of transport
        co2_trip, co2_trip_car, price, petrol_car_price = get_footprint(
            start_lat, start_lon, end_lat, end_lon, transportmode, ev, taxi)

        # Air quality for the location
        pollution_index = get_airquality(
            start_lat, start_lon, end_lat, end_lon)

        # Get temperature, precipitation percentage and precipitation intensity
        temp, p_percent, p_int = get_weather(end_lat, end_lon, ts_from, ts_to)

        # Fill dictionary
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
        params_dict['temperature'] = temp
        params_dict['precipitation_percentage'] = p_percent
        params_dict['precipitation_intensity'] = p_int

        # Check that public transport stops are adapted for PwRM.
        isAdapted = True
        if transportmode == Constants.public_transport and dis:
            for stp in directions_result[0]['legs'][0]['steps']:
                if stp['travel_mode'] == Constants.public_transport:
                    origin = stp['start_location']
                    final = stp['end_location']
                    start_location = gmaps.reverse_geocode((origin['lat'],
                                                            origin['lng']))
                    end_location = gmaps.reverse_geocode((origin['lat'],
                                                          origin['lng']))
                    isAdapted = isAdapted and isLineAdapted(
                        start_location['place_id'],
                        end_location['place_id'])
        # Populate warning for PwRM
        if isAdapted == False:
            params_dict['warnings'].append(
                "There is one line of the Metro step that is not adapted for PwRM")

        # Get closest charging point for electric vehicles
        if transportmode == Constants.driving and ev:
            v = getClosestSation(end_lat, end_lon)
            params_dict['closes_charging_station'] = (v['lat'], v['lon'])

        # Get closest parking spot for PwRM from dest. direction
        if transportmode == Constants.driving and dis:
            v = getClosestCarParking(end_lat, end_lon)
            params_dict['closes_parking_for_PRM'] = (v['lat'], v['lon'])

        # Get closest bike parking spot from dest. direction
        if transportmode == Constants.bike:
            v = getClosestBikeParking(end_lat, end_lon)
            params_dict['closes_parking_for_bike'] = (v['lat'], v['lon'])

        transport_dict[transportmode] = params_dict

    # Dump the dictionary data in json format
    jayson = json.dumps(transport_dict)
    print(jayson)

    return jayson
