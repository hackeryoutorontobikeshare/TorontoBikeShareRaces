import React, { Component } from 'react';
import firebase from './firebase.js';
import axios from 'axios';

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

      </div>
    );
  }
}

export default App;
