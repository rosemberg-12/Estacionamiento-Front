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
class UnParkModal extends Component {

  constructor(props){
    super(props);
    this.state={
      openModal:props.openModal,
      numberPlate: ""
    }
    this.getPriceInformation=this.getPriceInformation.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.unRegisterAction = this.unRegisterAction.bind(this);
    this.getButtons= this.getButtons.bind(this);
    this.getModalTitle= this.getModalTitle.bind(this);
    this.getNumberPlateInput= this.getNumberPlateInput.bind(this);
  }

  handleChange(event) {
    const { value, name} = event.target;
    this.setState({
      [name]: value
    });
  }

  //Register car
  unRegisterAction(event) {
    event.preventDefault();
    if(this.props.price!==0){
      this.props.closeModalAction();
    }
    else{
      const vehicle={
        numberPlate:this.state.numberPlate
      };
      this.props.unRegisterAction(vehicle);
    }
}

  getModalTitle(){
    if(this.props.price!==0){
      return (<h2>Vehicle Unparked !!</h2>);
    }
    else{
      return (<h2>Vehicle Unpark</h2>);
    }
  }

  getPriceInformation(){
    if(this.props.price!==0){
      return (<div className="form-group">
        <label>Parking price</label>
        <input type="number" className="form-control" id="price" name="price" onChange={this.handleChange}
          aria-describedby="price" autoComplete="off" value={this.props.price} readOnly/>
      </div>);
    }
    else{
      return "";
    }
  }

  getButtons(){
    if(this.props.price!==0){
      return(<button type="submit" className="btn btn-success">Close</button>);
    }
    else{
      return(<div><button type="submit" className="btn btn-success">Unpark</button>
             <button type="button" className="btn btn-danger" onClick={this.props.closeModalAction}>Cancel</button></div>);
    }
  }

  getNumberPlateInput(){
    if(this.props.price!==0){
      return (<div className="form-group">
                <label>Number of plate of unparked vehicle</label>
                <input type="text" className="form-control" id="numberPlate" name="numberPlate" onChange={this.handleChange}
                aria-describedby="numberPlate" autoComplete="off" readOnly/>
              </div>);
    }
    else{
      return (<div className="form-group">
                <label>Number of plate to unpark</label>
                <input type="text" className="form-control" id="numberPlate" name="numberPlate" onChange={this.handleChange}
                aria-describedby="numberPlate" placeholder="Enter Number plate" autoComplete="off" required/>
              </div>);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.openModal!==this.props.openModal){
      this.setState({
        openModal:this.props.openModal
      });
    }
  }

  render() {
    return (
      <Modal isOpen={this.state.openModal} style={customStyles} contentLabel="UnRegister Modal" >
        {this.getModalTitle()}
        <form onSubmit={this.unRegisterAction}>
          {this.getNumberPlateInput()}
          {this.getPriceInformation()}
          {this.getButtons()}
        </form>
      </Modal>
    );
  }
}

UnParkModal.defaultProps = {
    openModal: false
};

export default UnParkModal;
