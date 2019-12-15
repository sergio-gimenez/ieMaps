import React, { Component } from "react";
import MapContainer from "./MapContainer";
import "./css/ViewSplit.css";
// import data from "./response"
import TabsView from "./Tabs";

// const driving = data.driving;

class SplitScreen extends Component {
  render() {
    return (
      <section className="container">
        <div className="left-half">
          <MapContainer startLat={this.props.startLat} startLon={this.props.startLon}
                endLat={this.props.endLat} endLon={this.props.endLon}/>
          {/* <MapContainer startLat={driving.start_lat} startLon={driving.start_lon}
            endLat={driving.end_lat} endLon={driving.end_lon} /> */}
        </div>
        <div className="right-half">
          <TabsView result={this.props.result}/>
          {/* <TabsView response={data}/> */}
        </div>
      </section>
    );
  }
}


export default SplitScreen;