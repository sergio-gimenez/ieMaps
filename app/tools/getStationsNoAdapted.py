

import googlemaps

def getListOfStationsNonAdapted():
    gmaps = googlemaps.Client(key='AIzaSyD9R2jg0AERETo2MTHyEHqQTLS06hc7sM0')
    si = "Estación de metro de"
    list_of_stations = ["Plaça de Sants", "Espanya", "Urquinaona", "Clot", "Vallcarca",
        "Maragall", "Verdaguer", "Urquinaona", "Ciutadella-Vila Olímpica", "Virrei Amat"]
    output = ""
    for station in list_of_stations:
        geocode_result = gmaps.geocode(si + station)
        output += geocode_result[0]['place_id']+ " "
    
    try:
        f = open('Metro-Non-Adapted-Stations.txt', 'w')
        f.write(output)
    except:
        print("Error")
    return output


def isLineAdapted(station1_id, station2_id):
    stations_list = []
    try:
        f = open('./Datasets/Metro-Non-Adapted-Stations.txt', 'r')
        stations_list = f.readline().split(" ")
    except:
        print("Error")
    
    if station1_id in stations_list or station2_id in stations_list:
        return False
    
    return True
