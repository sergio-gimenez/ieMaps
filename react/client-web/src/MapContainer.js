import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


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
                    lat: this.props.lat,
                    lng: this.props.lon
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA85AZn35eZa6DwMyLhXQfSxM8nP3HB-nA'
})(MapContainer);