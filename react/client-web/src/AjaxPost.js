import React from 'react';
import './css/App.css';
import logo from './imgs/icon.png';
import Grid from '@material-ui/core/Grid';

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
            body: this.props.url.substring(8)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(JSON.stringify(result.driving, null, 2))
                    this.setState({
                        isLoaded: true,
                    });
                    // this.props.history.push(`/view/`)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
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
            return <div>Done</div>
        }
    }
}

export default AjaxRequest;

