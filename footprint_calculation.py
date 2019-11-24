from geopy.distance import geodesic
from datetime import datetime
from constants import Constants

def getTaxiPrice(input_datetime, list_of_points):
    b_point = list_of_points[0]
    km = 0
    for point in list_of_points[1:]:
        km += geodesic(b_point, point).km
        b_point = point
    day = input_datetime.weekday()
    hour = input_datetime.hour
    if (day >= 0 and day <= 4 ) and (hour >= 8 and hour <= 20):
        price = 2.15 + 1.13 * km
    elif (day >= 0 and day <= 4 ) and (hour < 8 or hour > 20):
        price = 2.15 + 1.34 * km
    elif (day == 5 or day == 6) and (hour >= 6 and hour <= 20):
        price = 2.15 + 1.34 * km
    else:
        price = 2.30 + 1.40 * km
    return price

def get_footprint (start_lat, start_lon, end_lat, end_lon, transport_mean, ev, taxi):

    #CO2 values expressed in kgs
    #petrol fuel efficiency
    liters_per_km = 0.11
    co2_per_liter = 2.31
    co2_per_km_petrol = co2_per_liter * liters_per_km

    #EVs efficiency
    co2_per_kwh = 0.193
    kwh_per_km = 0.1
    co2_per_km_ev = co2_per_kwh * kwh_per_km

    #Public transport efficiency
    liters_per_km_bus = 0.5
    avg_occupancy_bus = 12.7    #Datos TMB
    co2_per_km_passenger_bus = (co2_per_liter * liters_per_km_bus) / avg_occupancy_bus
    co2_per_km_passenger_metro = 0.04 #Datos TMB


    trip_distance = geodesic((start_lat, start_lon), (end_lat, end_lon)).km

    co2_trip_car = trip_distance * co2_per_km_petrol
    co2_trip_ev =  trip_distance * co2_per_km_ev
    co2_trip_bus = trip_distance * co2_per_km_passenger_bus
    co2_trip_metro =  trip_distance * co2_per_km_passenger_metro

    #Prices

    pt_price = 2.20
    gas_price = 1.3 #euro/liter
    kwh_price = 0.8 #euro/kwh
    petrol_car_price =  trip_distance * liters_per_km * gas_price
    ev_price = trip_distance * kwh_per_km * kwh_price
    taxi_coords = [(start_lat, start_lon), (end_lat, end_lon)]
    taxi_price = getTaxiPrice(datetime.today(), taxi_coords)
    if taxi == True and transport_mean == Constants.driving:
        price = taxi_price
        co2_trip = co2_trip_car
    elif ev == True and transport_mean == Constants.driving:
        price = ev_price
        co2_trip = co2_trip_ev
    if transport_mean == Constants.driving:
        price = petrol_car_price
        co2_trip = co2_trip_car
#    elif transport_mean == 'bus':
#       price = pt_price
#       co2_trip = co2_trip_bus
    elif transport_mean == Constants.public_transport:
        price = pt_price
        co2_trip = co2_trip_metro
    else:
        price = 0
        co2_trip = 0

    return co2_trip, co2_trip_car, price, petrol_car_price
