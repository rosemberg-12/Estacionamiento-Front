import React, { Component } from 'react';
import VehicleSlide from './VehicleSlide'

class VehicleContainer extends Component {

  render() {
    return (
          <div className="d-md-flex flex-md-4 w-100 my-md-3 pl-md-3">
            <VehicleSlide name="carSlide" id="carSlide" kindOfVehicle="Car"/>
            <VehicleSlide name="motorcycleSlide" id="carSlide" kindOfVehicle="Motorcycle"/>
          </div>
    );
  }
}
export default VehicleContainer;
