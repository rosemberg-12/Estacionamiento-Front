import React, { Component } from 'react';
import ParkModal from './ParkModal'

//Props to receive, *kindOfVehicle*, *enableButton*{to define if I as button am enable} and
//*updateCount*, function to update count from vacancy counter
class ParkButton extends Component {

  constructor(props){
    super(props);
    this.state={
      enableButton:props.enableButton,
      openParkModal:false,
      kindOfVehicle: props.kindOfVehicle
    };
    this.registerAction = this.registerAction.bind(this);
    this.getRegisterVehicleBody=this.getRegisterVehicleBody.bind(this);
    this.openModalAction=this.openModalAction.bind(this);
    this.closeModalAction=this.closeModalAction.bind(this);
  }

  registerAction(vehicle) {
    console.log(vehicle);
    if("Car"===vehicle.kindOfVehicle || "Motorcycle"===this.state.kindOfVehicle){
      console.log("Vehicle aaded "+vehicle.numberPlate);
      fetch('http://localhost:8080/registerVehicle', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: this.getRegisterVehicleBody(vehicle)
      }).then(function(response) {
        return response.json();
      }).then((data)=> {
        console.log("Json Response register action");
        console.log(data);
        if(data.response===true){
          alert("Vehicle register");
        }else{
          alert("the car could not be registered, "+data.messageException);
        }
        this.closeModalAction();
        this.props.updateCount();
      });
    }
  }

  getRegisterVehicleBody(vehicle){
    if("Car"===vehicle.kindOfVehicle){
      return JSON.stringify({"numberPlate": vehicle.numberPlate, "kindOfVehicle": "CAR"});
    }
    else if("Motorcycle"===vehicle.kindOfVehicle){
      return JSON.stringify({"numberPlate": vehicle.numberPlate, "kindOfVehicle": "MOTORCYCLE", "cylinderCapacity": vehicle.cc });
    }
    return JSON.stringify({});
  }

  openModalAction(){
    this.setState({ openParkModal:true });
  }

  closeModalAction(){
    this.setState({ openParkModal:false });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.enableButton!==this.props.enableButton){
      this.setState({
        enableButton:this.props.enableButton
      })
    }
  }

  render() {
    return (
      <div className="col-md">
      <button className="btn btn-success btn-block" id="Add" disabled={!this.state.enableButton} onClick={this.openModalAction}>
        <i className="fa fa-plus fa-2x">Add</i>
      </button>
      <ParkModal kindOfVehicle={this.state.kindOfVehicle} openModal={this.state.openParkModal}
        registerAction={this.registerAction} closeModalAction={this.closeModalAction}/>
      </div>
    );
  }
}

ParkButton.defaultProps={
  enableButton:true,
  kindOfVehicle:"",
  openParkModal:false
}

export default ParkButton;
