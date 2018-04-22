import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import style from './style.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Navbar />
      </header>
    );
  }
}

export default Header;