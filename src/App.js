import React, { Component } from 'react';
import './styles/components/App.css';
import Header from './components/Header'
import VehicleContainer from './components/VehicleContainer'


class App extends Component {
  render() {
    return (
      <div className="vehicle-container d-flex mx-auto flex-column">
        <Header id="mainHeader" name="mainHeader"/>
        <VehicleContainer id="mainContainer" name="mainContainer"/>
      </div>
    );
  }
}

export default App;
