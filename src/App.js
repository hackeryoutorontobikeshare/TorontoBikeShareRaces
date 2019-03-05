import React, { Component } from 'react';
import firebase from './firebase.js';
import axios from 'axios';
import NameDesc from './NameDesc.js';
import RacePoints from './RacePoints.js';
import Result from './Result.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Name: [],
      Desc: [],
      Race: []
    }
  }

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
