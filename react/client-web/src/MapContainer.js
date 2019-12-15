import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import EvStationIcon from '@material-ui/icons/EvStation';

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
                    name={'Current location 1'}
                    position={{ lat: this.props.startLat, lng: this.props.startLon }}
                    animation={this.props.google.maps.Animation.DROP}
                />
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Current location 2'}
                    position={{ lat: this.props.endLat, lng: this.props.endLon }}
                    animation={this.props.google.maps.Animation.DROP}
                />
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Charging Station'}
                    position={{ lat: this.props.closestCharging[0], lng: this.props.closestCharging[1] }}
                    animation={this.props.google.maps.Animation.DROP}
                    // icon={{
                    //     url: "@material-ui/icons/EvStation",
                    //     anchor: new this.props.google.maps.Point(32,32),
                    //     scaledSize: new this.props.google.maps.Size(64,64)
                    //   }}
                    // icon={EvStationIcon}
                />
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA85AZn35eZa6DwMyLhXQfSxM8nP3HB-nA'
})(MapContainer);