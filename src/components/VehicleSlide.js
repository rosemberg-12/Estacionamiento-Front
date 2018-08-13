import React, { Component } from 'react';
import VehicleVacancyCounter from './VehicleVacancyCounter'
import '../styles/components/VehicleSlide.css';


class VehicleSlide extends Component {

  constructor(props){
    super(props);
    this.state={
      kindOfVehicle: this.props.kindOfVehicle,
    }
  }

  render() {
    return (
        <div className="bg-dark col-md-6 mr-md-5 pt-1 px-3 px-md-5 text-center text-white overflow-hidden">
          <div className="my-3 py-3">
            <h3 className="display-5">{this.state.kindOfVehicle} Vacancy</h3>
            <VehicleVacancyCounter name="counter" id="counter" kindOfVehicle={this.state.kindOfVehicle}/>
          </div>
        </div>
    );
  }
}

VehicleSlide.defaultProps = {
    kindOfVehicle: "No defined",
};

export default VehicleSlide;
