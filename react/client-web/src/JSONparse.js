import React from 'react';
import data from "./response"; 

const driving = data.driving;

class Example1 extends React.Component {
	render() {
        console.log(driving.start_lat,driving.start_lon)
		return (
          <div>Hola</div>
        );
    }
} 
export default Example1;