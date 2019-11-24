import rpy2.robjects as robjects
import datetime as datetime
from datetime import timedelta
import forecastio
from datetime import datetime
import pytz
import pandas as pd


def forecast_weather(api_key, lat, lon, units="si", format="pandas_df", csv_export=False, wd=None):

    # Initialize variables
    hourly = []
    ini_dt = datetime.now()

    # Iterate through all needed days to download data day by day
    print ('### Downloading forecasted weather measures for latitude %s, longitude %s ###' % (lat, lon))

    meteo_data = forecastio.load_forecast(api_key, lat, lon, units=units)
    utc_timezone = pytz.UTC
    timezone = pytz.UTC #Remember! The output of this function will be always in UTC.

    # hourly dict
    for item in meteo_data.hourly().data:
        d = item.d
        d.update({
            'time': utc_timezone.localize(item.time).astimezone(timezone)
        })
        hourly.append(d)

    print ('Successful downloading process!')

    print ('Generating the hourly and daily datasets')
    df_hourly = pd.DataFrame(hourly)
    # df_daily = pd.DataFrame(daily)
    df_hourly = df_hourly.set_index("time")
    df_hourly = df_hourly.reset_index()

    # Write the results in a csv
    if wd is None:
        wd = ""
    elif wd[-1:]!="/":
        wd = wd+"/"
    filename = wd + "meteo_data/%s_%s_forecasting" % ("%2.2f" % lat, "%2.2f" % lon)
    df_local = already_downloaded_historical(filename)
    if csv_export is True:
        df_to_local = pd.concat([df_local,
                                 df_hourly
                                 ])
        print ('Exporting datasets to CSV files')
        df_to_local.to_csv("%s_hourly.csv" % (filename), index=False)

    # Print elapsed time
    print ('Done in %s seconds' % (datetime.now() - ini_dt).total_seconds())

    return df_hourly if format == "pandas_df" else output_by_list_of_columns(df_hourly)



def get_forecast(lat, lon):

    api_key = '6f162b83aa9d60e8036bd1e0a053ec1c'
    meteo_df = forecast_weather(api_key, lat, lon, units="si", format= "pandas_df", csv_export=False, wd=None)
    meteo_df =  meteo_df[['time', 'temperature', 'precipIntensity', 'precipProbability']]

    return meteo_df


def forecast_6h(lat, lon):

    r_source = robjects.r['source']
    r_source('airquality_forecast.R')
    r_getname = robjects.globalenv['forecast_airquality_6h']
    index_6h = r_getname()

    meteo_forecast = get_forecast(lat, lon)
    horizon = datetime.now() + timedelta(hours=6)
    day = horizon.day
    hour = horizon.hour
    meteo_forecast['hour'] = meteo_forecast['time'].dt.hour
    meteo_forecast['day'] = meteo_forecast['time'].dt.day
    for it in range(0,len(meteo_forecast['day'])):
        if day == meteo_forecast['day'][it] and hour == meteo_forecast['hour'][it]:
            break
    temperature_6h = meteo_forecast['temperature'][it]
    precipIntensity_6h = meteo_forecast['precipIntensity'][it]
    precipProbability_6h = meteo_forecast['precipProbability'][it]

    return(index_6h, temperature_6h, precipIntensity_6h, precipProbability_6h)

def forecast_tomorrow(lat, lon):
    r_source = robjects.r['source']
    r_source('airquality_forecast.R')
    r_getname = robjects.globalenv['forecast_airquality_tomorrow']
    index_tomorrow = r_getname()

    meteo_forecast = get_forecast(lat, lon)
    t = datetime.today()
    tomorrow = datetime(t.year, t.month, t.day, 9) + \
               timedelta(days=1)
    day = tomorrow.day
    hour = tomorrow.hour
    meteo_forecast['hour'] = meteo_forecast['time'].dt.hour
    meteo_forecast['day'] = meteo_forecast['time'].dt.day
    for it in range(0,len(meteo_forecast['day'])):
        if day == meteo_forecast['day'][it] and hour == meteo_forecast['hour'][it]:
            break
    temperature_tomorrow = meteo_forecast['temperature'][it]
    precipIntensity_tomorrow = meteo_forecast['precipIntensity'][it]
    precipProbability_tomorrow = meteo_forecast['precipProbability'][it]
    return(index_tomorrow, temperature_tomorrow, precipIntensity_tomorrow, precipProbability_tomorrow)
