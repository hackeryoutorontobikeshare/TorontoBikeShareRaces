import React, { Component } from 'react';
import firebase from './firebase.js';
import axios from 'axios';
import RacePoints from './RacePoints.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RacePoints />
      </div>
    );
  }
}

export default App;
