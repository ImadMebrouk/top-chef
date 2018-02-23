import React, { Component } from 'react';
import logo from './logo.svg';
import logoF from './logoF.png';
import logoM from './logoM.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoM} className="App-logoM" alt="logoM" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logoF} className="App-logoF" alt="logoF" />

          <h1 className="App-title">Web Application Architecture  </h1>

        </header>
        <p className="App-intro">
          Wanna eat good things at low prices ? See below...
        </p>

        <p className="test">
         integrer liste des restaurants
        </p>

      </div>
    );
  }
}

export default App;
