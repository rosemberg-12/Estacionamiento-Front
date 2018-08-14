import React, { Component } from 'react';
import Modal from 'react-modal';
import '../styles/components/TCRM.css';



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

//Props to receive, *kindOfVehicle*, *enableButton*{to define if I as button am enable} and
//*updateCount*, function to update count from vacancy counter
class TCRM extends Component {

  constructor(props){
    super(props);
    this.state={
      openTCRMModal:false,
      TCRM:0,
      unit:""
    };
    this.openModalAction=this.openModalAction.bind(this);
    this.closeModalAction=this.closeModalAction.bind(this);
    this.updateTCRMValue=this.updateTCRMValue.bind(this);
  }

  openModalAction(){
    this.setState({ openTCRMModal:true });
    this.updateTCRMValue();
  }

  closeModalAction(){
    this.setState({ openTCRMModal:false });
  }

  updateTCRMValue(){
    this.setState({
        TCRM:0,
        unit:""
    });
    var url="http://localhost:8080/getTCRM";
      fetch(url)
      .then(response => response.json())
      .then(data =>{
        console.log("Response of TCRM"+data);
        this.setState({
            TCRM:data.tcrm.value,
            unit:data.tcrm.unit
        });
      });
  }

  getTCRMTable(){
    if(this.state.TCRM===0){
      return(<p>Loading value....</p>);
    }
    else{
      return(
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Unit</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.unit}</td>
              <td>{this.state.TCRM}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  }


  render() {
    return (
      <div className="container-unpark">
      <button className="circle-button btn-success btn-block" id="Add" onClick={this.openModalAction}>
        <i className="fa fa-plus fa-2x">TCRM</i>
      </button>
      <Modal isOpen={this.state.openTCRMModal} style={customStyles} contentLabel="UnRegister Modal" >
        {this.getTCRMTable()}
        <button type="button" className="btn btn-danger" onClick={this.closeModalAction}>Close</button>
      </Modal>
      </div>
    );
  }
}

export default TCRM;
