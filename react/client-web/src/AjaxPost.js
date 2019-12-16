import React from 'react';
import logo from './imgs/icon.png';
import Grid from '@material-ui/core/Grid';
import View from './ViewSplit';

class AjaxRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: this.props.url
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        start_lat: result.driving.start_lat,
                        start_lon: result.driving.start_lon,
                        end_lat: result.driving.end_lat,
                        end_lon: result.driving.end_lon,
                        start_description: result.driving.start_description,
                        end_description: result.driving.end_description,
                        closes_charging_station: result.driving.closes_charging_station,
                        closes_parking_for_PRM: result.driving.closes_parking_for_PRM,
                        closes_parking_for_bike: result.bicycling.closes_parking_for_bike,
                        result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div>
                    <Grid container justify="center" direction="column" alignItems="center">
                        <img src={logo} className="App-logo" alt="logo" />
                        <div>Loading...</div>
                    </Grid>
                </div>
            );
        } else {
            return <View
                startLat={this.state.start_lat}
                startLon={this.state.start_lon}
                endLat={this.state.end_lat}
                endLon={this.state.end_lon}
                startDescription={this.state.start_description}
                endDescription={this.state.end_description}
                result={this.state.result} 
                closestCharging={this.state.closes_charging_station}
                closestParkingRMP={this.state.closes_parking_for_PRM}
                closestParkingBike={this.state.closes_parking_for_bike}
            />
        }
    }
}

export default AjaxRequest;

