import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import IconElectricVehicle from './imgs/electric-station.png';
import Accessible from './imgs/accessible.png';
import Bike from './imgs/bike.png';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: this.props.startLat,
                    lng: this.props.startLon
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    position={{ lat: this.props.startLat, lng: this.props.startLon }}
                    animation={this.props.google.maps.Animation.DROP}
                    name={this.props.endDescription}
                />
                <Marker
                    onClick={this.onMarkerClick}
                    position={{ lat: this.props.endLat, lng: this.props.endLon }}
                    animation={this.props.google.maps.Animation.DROP}
                    name={this.props.startDescription}
                />
                <Marker
                    onClick={this.onMarkerClick}
                    position={{ lat: this.props.closestCharging[0], lng: this.props.closestCharging[1] }}
                    animation={this.props.google.maps.Animation.DROP}
                    icon={IconElectricVehicle}
                    name={'Electric Vehicle Charging Station'}
                />
                <Marker
                    onClick={this.onMarkerClick}
                    position={{ lat: this.props.closestParkingRMP[0], lng: this.props.closestParkingRMP[1] }}
                    animation={this.props.google.maps.Animation.DROP}
                    icon={Accessible}
                    name={'Parking for PWRM'}
                />
                <Marker
                    onClick={this.onMarkerClick}
                    position={{ lat: this.props.closestParkingBike[0], lng: this.props.closestParkingBike[1] }}
                    animation={this.props.google.maps.Animation.DROP}
                    icon={Bike}
                    name={'Bike parking'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'PUT YOUR KEY HERE'
})(MapContainer);