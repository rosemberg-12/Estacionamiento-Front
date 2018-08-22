import React, { Component } from 'react';
import ParkModal from './ParkModal'
import SweetAlert from 'react-bootstrap-sweetalert'

//Props to receive, *kindOfVehicle*, *enableButton*{to define if I as button am enable} and
//*updateCount*, function to update count from vacancy counter

// place where you'd like in your app

class ParkButton extends Component {

  constructor(props){
    super(props);
    this.state={
      enableButton:props.enableButton,
      openParkModal:false,
      kindOfVehicle: props.kindOfVehicle,
      showSuccess: false,
      showError: false,
      messageError:""
    };
    this.registerAction = this.registerAction.bind(this);
    this.getRegisterVehicleBody=this.getRegisterVehicleBody.bind(this);
    this.openModalAction=this.openModalAction.bind(this);
    this.closeModalAction=this.closeModalAction.bind(this);
    this.showSuccess=this.showSuccess.bind(this);
    this.closeSuccess=this.closeSuccess.bind(this);
    this.showError=this.showError.bind(this);
    this.closeError=this.closeError.bind(this);
  }

  registerAction(vehicle) {
    if("Car"===vehicle.kindOfVehicle || "Motorcycle"===this.state.kindOfVehicle){
      var error=false;
      fetch('http://localhost:8080/registerVehicle', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: this.getRegisterVehicleBody(vehicle)
      }).then(function(response) {
        if(response.ok){
        }
        else{
          error=true;
          return response.text();
        }
      }).then((data)=> {
        if(!error){
          this.showSuccess();
          this.closeModalAction();
        }else{
          this.setState({ messageError:"The vehicle could not be registered, "+data});
          this.showError();
        }
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

  showSuccess(){
    this.setState({
      showSuccess:true
    })
  }
  closeSuccess(){
    this.setState({
      showSuccess:false
    })
  }

  showError(){
    this.setState({
      showError:true
    })
  }
  closeError(){
    this.setState({
      showError:false
    })
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
      <SweetAlert success onConfirm={this.closeSuccess} show={this.state.showSuccess}>
           Vehicle parked!
        </SweetAlert>
        <SweetAlert error onConfirm={this.closeError} show={this.state.showError}>
             {this.state.messageError}
        </SweetAlert>
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
