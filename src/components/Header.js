import React, { Component } from 'react';
import '../styles/components/Header.css';
import mainLogo from '../images/ceiba.jpeg';
class Header extends Component {

  render() {
    return (
      <header className="masthead">
        <div className="inner">
          <img src={mainLogo} alt="Avatar" className="avatar"></img>
          <h3 className="masthead">Ceiba Parking</h3>
        </div>
      </header>
    );
  }
}

export default Header;
