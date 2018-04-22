import React, { Component } from 'react';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import 'sanitize.css';
import './style.css';
import '../fonts/fonts.css';

import { hot } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <Hero />
      </div>
    );
  }
}

export default hot(module)(App);