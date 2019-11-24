from geopy.distance import geodesic
import pandas as pd

def getClosestSation(lat, lng):
        v = {'lat': lat, 'lon': lng}
        df = pd.read_csv("./Datasets/PUNTS_RECARREGA_VEHICLES_ELECTRICS.csv", encoding="ISO-8859-1")

        stations = {}

        latitudList = df.iloc[:]['LATITUD']
        longitudList = df.iloc[:]['LONGITUD']
        names = df.iloc[:]['CODI_IDENTIFICACIO_ESTACIO']

        tempDataList = []
        for it in range(0, len(latitudList)):
                if not(names[it] in stations.keys()):
                        dictionary = {}
                        dictionary['lat'] = float(latitudList[it].replace(',','.'))
                        dictionary['lon'] = float(longitudList[it].replace(',','.'))
                        stations[names[it]] = dictionary

        tempDataList = [stations[name] for name in stations.keys()]

        return closest(tempDataList, v)


def distance(lat_ori, lon_ori, lat_dest, lon_dest):
    return geodesic((lat_ori,lon_ori),(lat_dest,lon_dest)).km

def closest(data, v):
    return min(data, key=lambda p: distance(v['lat'],v['lon'],p['lat'],p['lon']))
