import React, { Component } from 'react';
import UnParkModal from './UnParkModal'

//Props to receive, *kindOfVehicle*, *enableButton*{to define if I as button am enable} and
//*updateCount*, function to update count from vacancy counter
class UnParkButton extends Component {

  constructor(props){
    super(props);
    this.state={
      enableButton:props.enableButton,
      openUnParkModal:false,
      kindOfVehicle: props.kindOfVehicle,
      price: 0
    };
    this.unRegisterAction = this.unRegisterAction.bind(this);
    this.openModalAction=this.openModalAction.bind(this);
    this.closeModalAction=this.closeModalAction.bind(this);
  }

  unRegisterAction(vehicle) {
    if("Car"===vehicle.kindOfVehicle || "Motorcycle"===this.state.kindOfVehicle){
      console.log("Vehicle aaded "+vehicle.numberPlate);
      fetch('http://localhost:8080/unregisterVehicle', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"numberPlate": vehicle.numberPlate})
      }).then(function(response) {
        return response.json();
      }).then((data)=> {
        console.log("Json Response register action"+data.response);
        if(data.response===true){
          this.setState({price:data.costOfParking})
        }else{
          alert("the car with number plate '"+vehicle.numberPlate+"' could not be unparked, "+data.messageException);
        }
        this.props.updateCount();
      });
    }
  }

  openModalAction(){
    this.setState({ openUnParkModal:true });
  }

  closeModalAction(){
    this.setState({ openUnParkModal:false, price: 0 });
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
      <button className="btn btn-danger btn-block" id="Remove" disabled={!this.state.enableButton} onClick={this.openModalAction}>
        <i className="fa fa-plus fa-2x">Remove</i>
      </button>
      <UnParkModal kindOfVehicle={this.state.kindOfVehicle} openModal={this.state.openUnParkModal}
        unRegisterAction={this.unRegisterAction} closeModalAction={this.closeModalAction} price={this.state.price}/>
      </div>
    );
  }
}

UnParkButton.defaultProps={
  enableButton:true,
  kindOfVehicle:"",
  openParkModal:false
}

export default UnParkButton;