import forecastio
import os
from datetime import datetime
from dateutil.relativedelta import relativedelta
import pytz
import pandas as pd
import numpy as np

def output_by_list_of_columns(df):
    df.time = df.time.map(lambda x: datetime.strftime(x, '%Y-%m-%dT%H:%M:%S.000Z'))
    return df.to_dict("list")

def already_downloaded_historical(filename):

    # Read the existing file and reuse the measures that are already downloaded
    if os.path.isfile("%s_hourly.csv" % filename):
        print ('There are measures already downloaded from this site!')
        print ('Importing datasets from CSV files')
        df_hourly = pd.read_csv("%s_hourly.csv" % (filename), index_col=False)
        print ('Hourly dataset imported')

        df_hourly.time = pd.to_datetime(df_hourly.time, utc=True)

    else:
        df_hourly = None

    return df_hourly

def historical_weather(api_key, cams_registered_mails, lat, lon, ts_from, ts_to, tz="UTC", units="si",
                          format="pandas_df", csv_export=True):

    # Date transformation str to datetime if is required
    # The tz variable always defines the ts_from and ts_to timezone in case they are introduced in str format
    # Remember! The output of the function will be always in UTC.
    timezone = pytz.timezone(tz)
    if (isinstance(ts_from, str) and isinstance(ts_to, str)):
        ts_from = datetime.strptime(ts_from, "%Y-%m-%d %H:%M:%S")
        ts_to = datetime.strptime(ts_to, "%Y-%m-%d %H:%M:%S")
    if ts_from.tzinfo is not None:
        ts_from = ts_from.astimezone(pytz.UTC)
    else:
        ts_from = timezone.localize(ts_from).astimezone(pytz.UTC)

    if ts_to.tzinfo is not None:
        ts_to = ts_to.astimezone(pytz.UTC)
    else:
        ts_to = timezone.localize(ts_to).astimezone(pytz.UTC)

    tz_local = forecastio.load_forecast(api_key, lat, lon, units=units).json['timezone']
    ts_from2 = ts_from.astimezone(pytz.timezone(tz_local))
    ts_from2 = ts_from2.replace(hour=0, minute=0, second=0)
    ts_from2 = ts_from2.astimezone(pytz.utc)
    ts_to2 = ts_to.astimezone(pytz.timezone(tz_local))
    ts_to2 = ts_to2.replace(hour=23, minute=59, second=59)
    ts_to2 = ts_to2.astimezone(pytz.utc)

    # Initialize variables
    ini_dt = datetime.now()
    ts = ts_from2
    hourly = []
    lat = round(float(lat), 2)
    lon = round(float(lon), 2)

    # Check if the are existing files from the same sites
    print ('Checking if there is a "meteo_data" directory')
    try:
        os.stat("meteo_data")
    except:
        os.mkdir("meteo_data")
    filename = "meteo_data/%s_%s_hist" % ("%2.2f"%lat, "%2.2f"%lon)
    df_local = already_downloaded_historical(filename)

    # Iterate through all needed days to download data day by day
    print ('### Obtaining the weather measures for latitude %s, longitude %s ###' % (lat, lon))

    df_hourly = pd.DataFrame()
    ts_downloaded = []

    while ts <= ts_to2:

        if df_local is not None and np.sum(
                (df_local.time >= ts) & (df_local.time <= (ts+relativedelta(days=1)-relativedelta(seconds=1)))
            )==24:
            df_h = df_local[(df_local.time >= ts) &
                (df_local.time <= ts+relativedelta(days=1)-relativedelta(seconds=1))]

        else:
            meteo_data = forecastio.load_forecast(api_key, lat, lon, time=ts, units=units)
            print ('--> Day %s downloaded' % ts.astimezone(pytz.timezone(meteo_data.json['timezone'])).strftime("%Y-%m-%d"))
            for item in meteo_data.hourly().data:
                d = item.d
                d.update({
                    'time': pytz.UTC.localize(item.time)
                })
                hourly.append(d)
            df_h = pd.DataFrame(hourly)
            ts_downloaded.extend([i.to_pydatetime() for i in list(df_h.time)])

        df_hourly = pd.concat([df_hourly,df_h])
        ts += relativedelta(days=1)

    # df_hourly.to_csv("testing.csv")

    print ('Successful downloading process!')

    df_hourly = df_hourly.set_index('time')
    df_hourly = df_hourly.resample('1H').mean().interpolate()
    df_hourly = df_hourly.reset_index()

    # Write the results in a csv
    if csv_export:
        df_to_local = pd.concat([df_local,
                                 df_hourly[np.isin(np.array(df_hourly.time),
                                                   np.array(pd.to_datetime(ts_downloaded))
                                           )]
                                 ])
        print ('Exporting datasets to CSV files')
        df_to_local = df_to_local.drop_duplicates(subset="time", keep="first")
        df_to_local.to_csv("%s_hourly.csv" % (filename), index=False)
    # Cut exactly to the defined timestamps
    df_hourly = df_hourly[df_hourly.time <= pd.Timestamp(ts_to)]
    df_hourly = df_hourly[df_hourly.time >= pd.Timestamp(ts_from)]

    # Print elapsed time
    print ('Done in %s seconds' % (datetime.now() - ini_dt).total_seconds())

    # Return the result
    return {
        'hourly': df_hourly if format == "pandas_df" else output_by_list_of_columns(df_hourly)
    }


def get_weather(lat, lon, ts_from, ts_to):
    api_key = '6f162b83aa9d60e8036bd1e0a053ec1c'
    mail = 'bgrillone@gmail.com'
    meteo_df = historical_weather(api_key, mail, lat, lon, ts_from, ts_to, tz="UTC", units="si",
                                     format="pandas_df", csv_export=True)['hourly']
    meteo_df =  meteo_df[['time', 'temperature', 'precipIntensity', 'precipProbability']]

    return float(meteo_df['temperature'][-1:]), float(meteo_df['precipProbability'][-1:]*100.00), float(meteo_df['precipIntensity'][-1:])

