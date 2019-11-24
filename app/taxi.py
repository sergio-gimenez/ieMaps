from datetime import datetime
from geopy.distance import geodesic 

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