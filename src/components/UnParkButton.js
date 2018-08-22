import React, { Component } from 'react';
import UnParkModal from './UnParkModal'
import '../styles/components/UnParkButton.css';
import SweetAlert from 'react-bootstrap-sweetalert'



//Props to receive, *kindOfVehicle*, *enableButton*{to define if I as button am enable} and
//*updateCount*, function to update count from vacancy counter
class UnParkButton extends Component {

  constructor(props){
    super(props);
    this.state={
      enableButton:true,
      openUnParkModal:false,
      price: 0,
      showError: false
    };
    this.unRegisterAction = this.unRegisterAction.bind(this);
    this.openModalAction=this.openModalAction.bind(this);
    this.closeModalAction=this.closeModalAction.bind(this);
    this.showError=this.showError.bind(this);
    this.closeError=this.closeError.bind(this);
  }

  unRegisterAction(vehicle) {
      var error=false;
      fetch('http://localhost:8080/unregisterVehicle', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"numberPlate": vehicle.numberPlate})
      }).then(function(response) {
        if(response.ok){
          return response.json();
        }
        else{
          error=true;
          return response.text();
        }
      }).then((data)=> {
        if(!error){
          this.setState({price:data.costOfParking})
        }else{
          this.setState({ messageError:"The Vehicle with number plate '"+vehicle.numberPlate+"' could not be unparked, "+data});
          this.showError();
        }
        this.props.updateCount(true);
      });

  }

  openModalAction(){
    this.setState({ openUnParkModal:true });
  }

  closeModalAction(){
    this.setState({ openUnParkModal:false, price: 0 });
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
      <div className="container-unpark">
      <button className="circle-button btn-danger btn-block" id="Remove" disabled={!this.state.enableButton} onClick={this.openModalAction}>
        <i className="fa fa-plus fa-2x">Remove Vehicle</i>
      </button>
      <UnParkModal openModal={this.state.openUnParkModal} unRegisterAction={this.unRegisterAction}
        closeModalAction={this.closeModalAction} price={this.state.price}/>
        <SweetAlert error onConfirm={this.closeError} show={this.state.showError}>
             {this.state.messageError}
        </SweetAlert>
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
