import React, { Component } from 'react';
import firebase from './firebase.js';
import axios from 'axios';
<<<<<<< HEAD
import RacePoints from './RacePoints.js'
||||||| merged common ancestors
=======
import NameDesc from './NameDesc.js';
import RacePoints from './RacePoints.js';
import Result from './Result.js';
>>>>>>> 096be265bf8f73c1daf8847f827fd546f41ca9a5

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <RacePoints />
||||||| merged common ancestors

=======
        <header></header>

        <NameDesc />
        <RacePoints />
        <Result />
>>>>>>> 096be265bf8f73c1daf8847f827fd546f41ca9a5
      </div>
    );
  }
}

export default App;
