import React, { Component } from 'react';
import Modal from 'react-modal';


  const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor      : '#333'
      }
  };

Modal.setAppElement('#root')
class ParkModal extends Component {

  constructor(props){
    super(props);
    this.state={
      openModal:props.openModal,
      kindOfVehicle:props.kindOfVehicle,
      numberPlate: "",
      cc:""
    }
    this.getCylinderField=this.getCylinderField.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.registerAction = this.registerAction.bind(this);

  }

  handleChange(event) {
    const { value, name} = event.target;
    this.setState({
      [name]: value
    });
  }

  //Register car
  registerAction(event) {
    event.preventDefault();
    const vehicle={
      numberPlate:this.state.numberPlate,
      cc: this.state.cc,
      kindOfVehicle: this.state.kindOfVehicle
    };
    this.props.registerAction(vehicle);
}

  getCylinderField(){
    if("Motorcycle"===this.state.kindOfVehicle){
      return (<div className="form-group">
        <label>Cylinder Capacity (CC)</label>
        <input type="number" className="form-control" id="cc" name="cc" onChange={this.handleChange}
          aria-describedby="CC" placeholder="Enter CC" autoComplete="off" required/>
      </div>);
    }
    else{
      return "";
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.openModal!==this.props.openModal){
      this.setState({
        openModal:this.props.openModal,
      })
    }
  }

  render() {
    return (
      <Modal isOpen={this.state.openModal} style={customStyles} contentLabel="Register Modal" >
        <h2>{this.state.kindOfVehicle} Register</h2>
        <form onSubmit={this.registerAction}>
          <div className="form-group">
            <label>Number of plate to register</label>
            <input type="text" className="form-control" id="numberPlate" name="numberPlate" onChange={this.handleChange}
              aria-describedby="numberPlate" placeholder="Enter Number plate" autoComplete="off" required/>
          </div>
          {this.getCylinderField()}
          <button type="submit" className="btn btn-success">Register</button>
          <button type="button" className="btn btn-danger" onClick={this.props.closeModalAction}>Cancel</button>
        </form>
      </Modal>
    );
  }
}

ParkModal.defaultProps = {
    openModal: false
};

export default ParkModal;
