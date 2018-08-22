import React, { Component } from 'react';
import VehicleSlide from './VehicleSlide'
import UnParkButton from './UnParkButton'
import TCRM from './TCRM'



class VehicleContainer extends Component {

  constructor(){
    super();
    this.state={
      updateValue:false
    }
    this.updateCountValue=this.updateCountValue.bind(this);
  }

  updateCountValue(value){
    this.setState({
      updateValue:value
    });
  }

  render() {
    return (
          <div className="d-md-flex flex-md-4 w-100 my-md-3 pl-md-3">
            <VehicleSlide updateCountContainer={this.updateCountValue} shouldUpdate={this.state.updateValue}
              name="carSlide" id="carSlide" kindOfVehicle="Car"/>
            <div className="col-md py-3">
                <TCRM/>
                <UnParkButton updateCount={this.updateCountValue}/>
              </div>
            <VehicleSlide updateCountContainer={this.updateCountValue} shouldUpdate={this.state.updateValue}
              name="motorcycleSlide" id="carSlide" kindOfVehicle="Motorcycle"/>
          </div>
    );
  }
}
export default VehicleContainer;
