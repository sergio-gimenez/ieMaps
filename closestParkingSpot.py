from geopy.distance import geodesic
import pandas as pd

df = pd.read_csv("./Datasets/Infraestructures_Inventari_Reserves.csv", encoding="ISO-8859-1")

parking_spots = []
bike_spots = []

latitudList = df.iloc[:]['Latitud']
longitudList = df.iloc[:]['Longitud']
cr = df.iloc[:]['Codi_Reserva']

def getClosestCarParking(lat, lng):
    v = {'lat': lat, 'lon': lng}
    parking_spots = []
    for it in range(0, len(latitudList)):
        if cr[it] == "PMR":
            dictionary = {}
            dictionary['lat'] = float(latitudList[it])
            dictionary['lon'] = float(longitudList[it])
            parking_spots.append(dictionary)
    return closest(parking_spots, v)

def getClosestBikeParking(lat, lng):
    v = {'lat': lat, 'lon': lng}
    parking_spots = []
    for it in range(0, len(latitudList)):
        if cr[it] == "Bicicletes vorera":
            dictionary = {}
            dictionary['lat'] = float(latitudList[it])
            dictionary['lon'] = float(longitudList[it])
            parking_spots.append(dictionary)
    return closest(parking_spots, v)


def distance(lat_ori, lon_ori, lat_dest, lon_dest):
    return geodesic((lat_ori,lon_ori),(lat_dest,lon_dest)).km

def closest(data, v):
    return min(data, key=lambda p: distance(v['lat'],v['lon'],p['lat'],p['lon']))



v = {'lat': 39.7622290, 'lon': -86.1519750}
lat = v['lat']
lng = v['lon']
print(getClosestBikeParking(lat, lng))
print(getClosestCarParking(lat, lng))
