import React, { Component } from 'react';
import firebase from './firebase.js';
import axios from 'axios';
import NameDesc from './NameDesc.js';
// import RacePoints from './RacePoints.js';
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

  render(){

    return (
      <div className="App">
        <header>
          <h1>Welcome to Toronto Bike Share Races</h1>
          <button>Create Race</button>
        </header>

        <NameDesc />
        {/* <RacePoints /> */}
        <Result 
        name={this.state.name} 
        description={this.state.description} 
        startP={this.state.race.startPoint} 
        endP={this.state.race.endPoint}
        checkP={this.state.checkPoint}
        />

      </div>
    );
  }
}

export default App;
