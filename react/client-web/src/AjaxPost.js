import React from 'react';
import './css/App.css';
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
                        Loading...
                    </Grid>
                </div>
            );
        } else {
            return <View startLat={this.state.start_lat} startLon={this.state.start_lon}
                endLat={this.state.end_lat} endLon={this.state.end_lon} result={this.state.result} />
        }
    }
}

export default AjaxRequest;

