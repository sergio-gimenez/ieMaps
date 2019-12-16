# ieMaps: an inclusive eco-friendly app for mobility

![/img/ieMaps.png](/img/iemaps.png)


# Table of contents

- [ieMaps: an inclusive eco-friendly app for mobility](#iemaps-an-inclusive-eco-friendly-app-for-mobility)
- [Table of contents](#table-of-contents)
- [Overview](#overview)
- [Run the project](#run-the-project)
  - [Requeriments](#requeriments)
    - [Docker](#docker)
    - [docker-compose](#docker-compose)
  - [Running](#running)
    - [Fast run (plug-and-play)](#fast-run-plug-and-play)
    - [Run it locally](#run-it-locally)
- [How does it works?](#how-does-it-works)
    - [Server Code (Model)](#server-code-model)
    - [Flask (Controller)](#flask-controller)
    - [React (View)](#react-view)
- [Parameters calulation](#parameters-calulation)
  - [Forecast prediction model](#forecast-prediction-model)
  - [Air quality](#air-quality)
  - [Availability of electric vehicle chargers](#availability-of-electric-vehicle-chargers)
  - [Carbon footprint calculation](#carbon-footprint-calculation)
  - [Car parking spots for PRM (People with Reduced Mobility)](#car-parking-spots-for-prm-people-with-reduced-mobility)
  - [Bike parking spots for bikes](#bike-parking-spots-for-bikes)
  - [Temperature](#temperature)
  - [Precipitation in real time and precipitation prediction](#precipitation-in-real-time-and-precipitation-prediction)
  - [Taxi pricing](#taxi-pricing)



# Overview

**ieMaps** is an **inclusive** and **eco-friendly** Google Maps implementation.
It uses the [Google Maps API](https://cloud.google.com/maps-platform/) to
perform all actions related to mobility. Google Maps is the quintessential web
mapping service, but still, it does not care about the **environment** neither
the **people with reduced mobility** (PWRM since now).

Knowing all the above, we decided to implement a third-party app that gives you
a service like google maps but taking care of enviroment and people at the same
time.
We calculate the **footprint** of every trip shown in screen, so that the user
knows what impact has for the planet to move around. We also calculate the **cost**
of the trip, as well as the **air** **pollution** and **forecast prediction** of today and
tomorrow.

We care about people with reduced mobility. We take care of the **subway** **stations**
that are not propperly equipped properly for them to move around the station. If
the preffered transport mode is by car, we show the
nearest reserved parking spot for reduced mobility people.

By know, we take care of the following parameters in the city of **Barcelona**:

* Air quality
* Model that predicts the air quality of the following days
* Availability of electric vehicle chargers
* Carbon footprint calculation
* Car parking spots for PWRM
* Evaluation of the consumption of your vehicle
* Temperature
* Precipitation in real time and precipitation prediction
* Closest bike parking spot close to destination
* Price of taxis

# Run the project


## Requeriments
To run the implementation, make sure you have installed Docker Engine and Docker-compose.

If not, check the following instructions:

### Docker

To install docker check official installation guide for [Windows](https://docs.docker.com/docker-for-windows/install/),
[Mac](https://docs.docker.com/docker-for-mac/install/) or
[Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

For **debian distros**, fastest way is probably install from apt using the following commands:

Update software repositories
```
sudo apt-get update
```

Uninstall old versions of docker
```
sudo apt-get remove docker docker-engine docker.io
```

Install docker
```
sudo apt install docker.io
```
Start and automate docker. The Docker service needs to be setup to run at startup. To do so,type in each command followed by enter.
```
sudo systemctl start docker
sudo systemctl enable docker
```

---
**IMPORTANT**

Make sure you don't need to type `sudo` every time you run docker. To do so, run the following command:

```
sudo usermod -aG docker $(whoami)

```
Reboot to apply this change.

---

### docker-compose


For docker-compose, just run these commands:

```source-shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose
```

## Running

### Fast run (plug-and-play)
In order to run the project in dockers, just run the `deploy.sh` bash script located in the
root project folder.

![MVC_diagram_docker](/img/MVC_diagram_docker.png)

### Run it locally
Node server and Flask server can be runned locally by installing all the
dependencies locally. 

For run the **node (react)** server:
- Make sure you have `npm` installed and run `npm
install` in `/ieMaps_SAD/react/client-web` to install all needed dependencies.
- Afterwards, run `npm start` in same directory in order ro run the server
  listening in port `3000`

For the **flask (python)** server:
- Make sure you have `python3` and `pip` installed. Install all needed
  dependencies by running `pip install requeriments.txt` in `ieMaps_SAD/app`
  directory.

- Afterwards run the server by running `python3 serverflask.py`. It will start flask server running on port `5000`.



# How does it works?


![MVC_diagram](/img/MVC_diagram.png)


### Server Code (Model)
It consist of several python scripts that calculate the output parameters.
Finally, `ieMaps.py` script merge all the information in a JSON file in order to
be sent.

### Flask (Controller)
Flask is a micro web framework written in Python. It listens in port `5000` for
a `POST` method. If the `POST` method is OK, it returns an `OK 200` HTTP
response plus the JSON response prepared by the model.

### React (View)
React is a JavaScript library for building user interfaces. Is the responsible
of creating the **input form** and sending it to the Flask API. Then it waits to
the JSON response and prints the information from the JSON in a map and in the screen.

# Parameters calulation


## Forecast prediction model
We have used a **'Exponential smoothing state space model'** that predicts the weather for the following days.

We have implemented the model in R and used this [forecast package](https://www.rdocumentation.org/packages/forecast/versions/8.9) for the **Air Quality** prediction.

Used API
[Forecasting Functions for Time Series and Linear Models](https://www.rdocumentation.org/packages/forecast/versions/8.9)

## Air quality
We have implemented a non-linear scale between one and three averaging the scaled values for each non-healthy emitted gas.

![footprint](/img/footprint.jpeg)

[Qualitat de l'aire dataset](https://opendata-ajuntament.barcelona.cat/data/en/dataset/qualitat-aire-detall-bcn)

## Availability of electric vehicle chargers
We have used a [dataset](https://opendata-ajuntament.barcelona.cat/resources/bsm/PUNTS_RECARREGA_VEHICLES_ELECTRICS.csv) given at Everis talk.

## Carbon footprint calculation
> (Kg CO2 / l) * l/km * desplacement

* [Carbon intensity (kg of CO2 emitted per electricity kWh produced)](https://www.electricitymap.org/?page=country&solar=false&remote=true&wind=false&countryCode=ES)

* [Calculamos la ocupacion del transporte publico](https://ecomovilidad.net/global/calculamos-la-ocupacion-del-transporte-publico/)

* [Electric cars efficiency comparison](https://pushevs.com/2016/11/23/electric-cars-range-efficiency-comparison/)

* [THE INFLUENCE OF LIFESTYLE AND BUILT
ENVIRONMENT FACTORS ON TRANSPORT CO2
EMISSIONS: THE CASE STUDY OF
AUTONOMOUS UNIVERSITY OF BARCELONA](http://oa.upm.es/49947/1/INVE_MEM_2017_271545.pdf)

## Car parking spots for PRM (People with Reduced Mobility)
We have taken information of PRM spots at this dataset: [Typology of the reserved parking spots in the infrastructure network of the city of Barcelona
](https://opendata-ajuntament.barcelona.cat/data/en/dataset/infraestructures-m-reserves).

## Bike parking spots for bikes
We have taken information of PRM spots at this [dataset]().

## Temperature
We have used the [Dark Sky](https://darksky.net/dev) API. It allows you to look up weather around the globe. Returning:

* Current weather condition
* Minute-byminute forecasts to one to one hour


## Precipitation in real time and precipitation prediction
We have used the [Dark Sky](https://darksky.net/dev) API. It allows you to look up weather around the globe. Returning:

* Current weather condition
* Minute-byminute forecasts to one to one hour


## Taxi pricing
![TaxiTable](/img/taxiTable.jpeg)
