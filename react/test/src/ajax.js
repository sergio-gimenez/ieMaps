import React from 'react';

class AjaxRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: "startAddress=Edificio+B3+-+Campus+Nord+UPC+1-3,+Carrer+de+Jordi+Girona,+08034+Barcelona&endAddress=Plaça+Catalunya,+Barcelona&dayOfSearch=2019-12-10+23:00:00&dis=True&taxi=False&ev=True" // <-- Post parameters
            // body: this.props.url
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(JSON.stringify(result, null, 2))
                    this.setState({
                        isLoaded: true,
                        driving: result.driving
                    });
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
        const { error, isLoaded, result } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <div>CACA</div>
        }
    }
}

export default AjaxRequest;

