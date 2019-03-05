import React, { Component } from 'react';
import firebase from './firebase.js';
import axios from 'axios';
<<<<<<< HEAD
// import NameDesc from './NameDesc.js';
import RacePoints from './RacePoints.js';
||||||| merged common ancestors
import NameDesc from './NameDesc.js';
import RacePoints from './RacePoints.js';
=======
import NameDesc from './NameDesc.js';
// import RacePoints from './RacePoints.js';
>>>>>>> e8baf251df0217fb2ce4d742c8855a708c0e9f71
import Result from './Result.js';
import './styles/Setup.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      stations:[],
      name: 'Maeesha',
      description: "Maeesha's Race",
      race: {
        startPoint:'Yonge st.',
        endPoint:'Spadina st.',
        checkPoint:[]
      },

    }
  }

  componentDidMount(){
    axios({
      method: 'GET',
      url: 'http://api.citybik.es/v2/networks/toronto',
      dataResponse: 'json'
    })
    .then((response) => {
      const stations = response.data.network.stations;
      const stationArr = [];
      stations.forEach((item)=>{
        stationArr.push(item);
      })
      this.setState({
        stations:stationArr
      });
    })
  }

  handleRender = (array) => {
    array.forEach((item)=>{
      return <option value={item.name}></option>
    })
  }

  render(){

    return (
      <div className="App">
        <header>
          <h1>Welcome to Torotno Bike Race</h1>
          <button>Creat Race</button>
        </header>

<<<<<<< HEAD
        {/* <NameDesc /> */}
        <RacePoints />
        <Result />
||||||| merged common ancestors
        <NameDesc />
        <RacePoints />
        <Result />
=======
        <NameDesc />
        {/* <RacePoints OnRender={this.handleRender}/> */}
        <Result 
        name={this.state.name} 
        description={this.state.description} 
        startP={this.state.race.startPoint} 
        endP={this.state.race.endPoint}
        // checkP={this.state.checkPoint}
        />

>>>>>>> e8baf251df0217fb2ce4d742c8855a708c0e9f71
      </div>
    );
  }
}

export default App;