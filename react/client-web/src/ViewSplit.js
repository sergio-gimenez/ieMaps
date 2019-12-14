import React, { Component } from "react";
import MapContainer from "./MapContainer";
import "./css/ViewSplit.css";
import response from "./response"

const driving = response.driving;

class SplitScreen extends Component {
  render() {
    return (
      <section class="container">
        <div class="left-half">
          {/* <MapContainer startLat={this.props.startLat} startLon={this.props.startLon}
                endLat={this.props.endLat} endLon={this.props.endLon}/> */}
          <MapContainer startLat={driving.start_lat} startLon={driving.start_lon}
            endLat={driving.end_lat} endLon={driving.end_lon} />
        </div>
        <div class="right-half">
          <h1>Right Half</h1>
          <p>If your knees aren't green by the end of the day, you ought to seriously re-examine your life.</p>
        </div>
      </section>
    );
  }
}


export default SplitScreen;