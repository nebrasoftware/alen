import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Link from './Link/Link';
import style from './style.css';

const Logo = () => (
  <svg viewBox="0 0 146.53 146.53">
    <circle fill="#b3000f" cx="73.27" cy="73.27" r="73.27"/>
    <polygon fill="#fff" points="71.16 49.26 105.71 49.26 64.45 94.55 42.98 94.55 71.16 49.26"/>
  </svg>
)

class Header extends Component {
  render() {
    return (
      <header className={style.header}>
        <Link href="#">
          <Logo />
        </Link>
        <Navbar />
      </header>
    );
  }
}

export default Header;