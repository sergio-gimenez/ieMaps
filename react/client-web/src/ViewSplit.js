import React, { Component } from "react";
import MapContainer from "./MapContainer";
import "./css/ViewSplit.css";

class SplitScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <section class="container">
        <div class="left-half">
          <MapContainer startLat={this.props.startLat} startLon={this.props.startLon}
                endLat={this.props.endLat} endLon={this.props.endLon}/>
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