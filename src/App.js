import React, { Component } from 'react';
import firebase from './firebase.js';
import axios from 'axios';
import RacePoints from './RacePoints.js'
import NameDesc from './NameDesc.js';
import RacePoints from './RacePoints.js';
import Result from './Result.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header></header>

        <NameDesc />
        <RacePoints />
        <Result />
      </div>
    );
  }
}

export default App;
