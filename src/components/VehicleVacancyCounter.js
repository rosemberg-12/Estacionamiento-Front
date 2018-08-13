import React, { Component } from 'react';
import '../styles/components/VacancyCounter.css';
import ParkButton from './ParkButton'
import UnParkButton from './UnParkButton'
import PropTypes from 'prop-types';

const maxCapacities = {
      "Car"                   : 20,
      "Motorcycle"            : 10
};
class VehicleVacancyCounter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vacancy: 0,
      kindOfVehicle: props.kindOfVehicle,
      maxCapacity:maxCapacities[props.kindOfVehicle],
      registerButtonEnable: true,
      unRegisterButtonEnable: true
    };
    this.updateCountValue=this.updateCountValue.bind(this);
    this.getVacancyURL=this.getVacancyURL.bind(this);
  }

  updateCountValue(){
    var value=0;
    var url=this.getVacancyURL();
    if(url===""){
      alert("Kind of vehicle unknow");
    }
    else{
      console.log("Vacancy URL "+url);
      fetch(url)
      .then(response => response.json())
      .then(data =>{
        console.log("Response of Vacancy request"+data);
        value=parseInt(data.message , 10 );
        console.log("Value of Unregister");
        console.log(value < this.state.maxCapacity)
        this.setState({
          vacancy: value,
          registerButtonEnable: value>0,
          unRegisterButtonEnable: value < this.state.maxCapacity
        });
      });
    }
  }

  getVacancyURL(){
    if("Car"=== this.state.kindOfVehicle){
      return "http://localhost:8080/carsVacancy";
    }
    else if("Motorcycle"=== this.state.kindOfVehicle){
      return "http://localhost:8080/motorcycleVacancy";
    }
    return "";
  }

  componentDidMount(){
    this.updateCountValue();
  }

  render() {
    return (
      <div>
        <div className="container" align="center">
          <div className="clicker border border-secondary rounded">
            <div className="clicker-display d-flex align-items-center bg-light text-secondary">
              <div className="mx-auto display-4">{this.state.vacancy}</div>
            </div>
          </div>
        </div>
        <div className="no-gutters d-flex flex-row">
          <ParkButton kindOfVehicle={this.state.kindOfVehicle} enableButton={this.state.registerButtonEnable}
            updateCount={this.updateCountValue}/>
          <UnParkButton kindOfVehicle={this.state.kindOfVehicle} enableButton={this.state.unRegisterButtonEnable}
            updateCount={this.updateCountValue}/>
        </div>
      </div>
    );
  }
}

VehicleVacancyCounter.defaultProps = {
    kindOfVehicle: ""
};

VehicleVacancyCounter.propTypes = {
    vacancy: PropTypes.number
};

export default VehicleVacancyCounter;
