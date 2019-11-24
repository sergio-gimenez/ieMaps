# iEMaps: an inclusive eco-friendly app for mobility
(copyright not included)

![/img/ieMaps.png](/img/iemaps.png)



# Table of contents

* [iEMaps: an inclusive eco-friendly app for mobility](#iemaps-an-inclusive-eco-friendly-app-for-mobility)
* [Overview](#overview)
   * [Marketing stuff](#marketing-stuff)
      * [Eco-friendly stuff](#eco-friendly-stuff)
      * [Inclusive stuff](#inclusive-stuff)
      * [Hippie stuff](#hippie-stuff)
   * [Technical stuff](#technical-stuff)
      * [Forecast prediction model](#forecast-prediction-model)
      * [Air quality](#air-quality)
      * [Availability of electric vehicle chargers](#availability-of-electric-vehicle-chargers)
      * [Carbon footprint calculation](#carbon-footprint-calculation)
      * [Car parking spots for PRM (People with Reduced Mobility)](#car-parking-spots-for-prm-people-with-reduced-mobility)
      * [Bike parking spots for bikes](#bike-parking-spots-for-bikes)
      * [Temperature](#temperature)
      * [Precipitation in real time and precipitation prediction](#precipitation-in-real-time-and-precipitation-prediction)
      * [Taxi pricing](#taxi-pricing)


# Overview


**ieMaps** is an **inclusive** and **eco-friendly** Google Maps implementation. ~~And yes, we use GoogleMaps Api. But Waze does it and nobody cares~~. It takes in account several parameters such as:

* Air quality
* Model that predicts the air quality of the following days
* Availability of electric vehicle chargers
* Carbon footprint calculation
* ~~Cow air contamination for its backside~~
* Car parking spots for PRM (People with Reduced Mobility)
* Bike parking spots for bikes
* Evaluation of the consumption of your vehicle  
* Temperature
* Precipitation in real time and precipitation prediction
* Closest bike parking spot close to destination
* Price of taxis


## Marketing stuff

### Eco-friendly stuff
We take care about the green stuff. Snoop Dogg does it too. We calculate the footprint of every trip shown in screen, so that the user knows how bad is for the planet to ~~move his ass~~ move around. We also calculate the money-money Puigdemoney of the trip, as well as the air pollution and weather of today, tomorrow, until 2050 when the world ends.

### Inclusive stuff
We also care about with Reduced Mobility: we take care of the subway stations that are not equipped properly for them to move around the station, we show the nearest reserved parking spot for Reduced Mobility People.

### Hippie stuff
Finally, and Tesla Motors hasn't paid us for getting that feature, we calculate the benefits of using an electric vehicle for the transport. Anyway, and if you are Elon Musk, just tell that we are opened for new career oportunities and/or bribes.

All in all, and knowing that we live in a world with Expression Freedom, just say that, honestly, our project is waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay better than the others. Ask my grandmother.


## Technical stuff

### Forecast prediction model
We have used a **'Exponential smoothing state space model'** that predicts the weather for the following days.

We have implemented the model in R and used this [forecast package](https://www.rdocumentation.org/packages/forecast/versions/8.9) for the **Air Quality** prediction.

Used API
[Forecasting Functions for Time Series and Linear Models](https://www.rdocumentation.org/packages/forecast/versions/8.9)


### Air quality
We have implemented a non-linear scale between one and three averaging the scaled values for each non-healthy emitted gas.

![footprint](/img/footprint.jpeg)

[Qualitat de l'aire dataset](https://opendata-ajuntament.barcelona.cat/data/en/dataset/qualitat-aire-detall-bcn)

### Availability of electric vehicle chargers
We have used a [dataset](https://opendata-ajuntament.barcelona.cat/resources/bsm/PUNTS_RECARREGA_VEHICLES_ELECTRICS.csv) given at Everis talk.

### Carbon footprint calculation
> (Kg CO2 / l) * l/km * desplacement

* [Carbon intensity (kg of CO2 emitted per electricity kWh produced)](https://www.electricitymap.org/?page=country&solar=false&remote=true&wind=false&countryCode=ES)

* [Calculamos la ocupacion del transporte publico](https://ecomovilidad.net/global/calculamos-la-ocupacion-del-transporte-publico/)

* [Electric cars efficiency comparison](https://pushevs.com/2016/11/23/electric-cars-range-efficiency-comparison/)

* [THE INFLUENCE OF LIFESTYLE AND BUILT
ENVIRONMENT FACTORS ON TRANSPORT CO2
EMISSIONS: THE CASE STUDY OF
AUTONOMOUS UNIVERSITY OF BARCELONA](http://oa.upm.es/49947/1/INVE_MEM_2017_271545.pdf)

### Car parking spots for PRM (People with Reduced Mobility)
We have taken information of PRM spots at this dataset: [Typology of the reserved parking spots in the infrastructure network of the city of Barcelona
](https://opendata-ajuntament.barcelona.cat/data/en/dataset/infraestructures-m-reserves).

### Bike parking spots for bikes
We have taken information of PRM spots at this [dataset]().

### Temperature
We have used the [Dark Sky](https://darksky.net/dev) API. It allows you to look up weather around the globe. Returning:

* Current weather condition
* Minute-byminute forecasts to one to one hour


### Precipitation in real time and precipitation prediction
We have used the [Dark Sky](https://darksky.net/dev) API. It allows you to look up weather around the globe. Returning:

* Current weather condition
* Minute-byminute forecasts to one to one hour


### Taxi pricing
![TaxiTable](/img/taxiTable.jpeg)
