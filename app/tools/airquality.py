import pandas as pd
from geographiclib.geodesic import Geodesic
from geopy.distance import geodesic
from datetime import date
import wget
from constants import Constants


def getstation(lat_start, lon_start, lat_end, lon_end):
    stations_url = 'https://opendata-ajuntament.barcelona.cat/resources/aspb/Qualitat_Aire_Estacions.csv'

    filename = wget.download(stations_url, Constants.TMP_DIR)
    stations = pd.read_csv(filename)
    stations = stations.drop_duplicates('Longitud')

    # define the WGS84 ellipsoid
    geod = Geodesic.WGS84
    l = geod.InverseLine(lat_start, lon_start, lat_end, lon_end)

    # Compute the midpoint
    m = l.Position(0.5 * l.s13)

    # Get closest station
    min_g = float('inf')
    for station in range(0, len(stations)):
        g = geodesic((m['lat2'], m['lon2']), (stations.iloc[station]
                                              ['Latitud'], stations.iloc[station]['Longitud'])).km
        if g < min_g:
            min_g = g
            closest_station_lon = stations.iloc[station]['Longitud']

    closest_station = stations.loc[stations['Longitud']
                                   == closest_station_lon]['Estacio']

    return int(closest_station)


def get_airquality(lat_start, lon_start, lat_end, lon_end):

    # Download air quality data and read index table
    closest_station = getstation(lat_start, lon_start, lat_end, lon_end)

    # Index to determine air quality (check README)
    quality_index = pd.read_csv("./Datasets/quality_index.csv")

    # Get real time air state
    air_quality_url = 'https://opendata-ajuntament.barcelona.cat/resources/aspb/Qualitat_Aire_Detall.csv'
    air_quality_file = wget.download(air_quality_url, Constants.TMP_DIR)
    air_quality = pd.read_csv(air_quality_file)

    air_quality = air_quality.loc[air_quality['ESTACIO'] == closest_station]
    air_quality = air_quality.loc[air_quality['DIA'] == 11]

    SO2 = air_quality.loc[air_quality['CODI_CONTAMINANT'] == 1]['H23']
    NO2 = air_quality.loc[air_quality['CODI_CONTAMINANT'] == 8]['H23']
    O3 = air_quality.loc[air_quality['CODI_CONTAMINANT'] == 14]['H23']
    CO = air_quality.loc[air_quality['CODI_CONTAMINANT'] == 6]['H23']
    PM10 = air_quality.loc[air_quality['CODI_CONTAMINANT'] == 10]['H23']

    # Parametritzacio de la qualitat de l'aire --> índex de polució
    counter = 5
    try:
        if int(SO2) < int(quality_index.loc[quality_index['pollutants'] == 'SO2']['good_max']):
            SO2_i = 1
        elif int(SO2) < int(quality_index.loc[quality_index['pollutants'] == 'SO2']['medium_max']):
            SO2_i = 2
        else:
            SO2_i = 3
    except:
        print('No SO2 data available')
        SO2_i = 0
        counter = counter - 1

    try:
        if int(PM10) < int(quality_index.loc[quality_index['pollutants'] == 'PM10']['good_max']):
            PM10_i = 1
        elif int(PM10) < int(quality_index.loc[quality_index['pollutants'] == 'PM10']['medium_max']):
            PM10_i = 2
        else:
            PM10_i = 3
    except:
        print('No PM10 data available')
        PM10_i = 0
        counter = counter - 1

    try:
        if int(CO) < int(quality_index.loc[quality_index['pollutants'] == 'CO']['good_max']):
            CO_i = 1
        elif int(CO) < int(quality_index.loc[quality_index['pollutants'] == 'CO']['medium_max']):
            CO_i = 2
        else:
            CO_i = 3
    except:
        print('No CO data available')
        CO_i = 0
        counter = counter - 1

    try:
        if int(O3) < int(quality_index.loc[quality_index['pollutants'] == 'O3']['good_max']):
            O3_i = 1
        elif int(O3) < int(quality_index.loc[quality_index['pollutants'] == 'O3']['medium_max']):
            O3_i = 2
        else:
            O3_i = 3
    except:
        print('No O3 data available')
        O3_i = 0
        counter = counter - 1

    try:
        if int(NO2) < int(quality_index.loc[quality_index['pollutants'] == 'NO2']['good_max']):
            NO2_i = 1
        elif int(NO2) < int(quality_index.loc[quality_index['pollutants'] == 'NO2']['medium_max']):
            NO2_i = 2
        else:
            NO2_i = 3
    except:
        print('No NO2 data available')
        NO2_i = 0
        counter = counter - 1

    try:
        pollution_index = (O3_i + PM10_i + CO_i + SO2_i + NO2_i) / counter
    except:
        pollution_index = 'No data available'

    return pollution_index
