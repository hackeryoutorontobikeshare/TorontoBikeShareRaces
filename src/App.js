import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase.js';
import RacePoints from './RacePoints.js';
import NameDesc from './NameDesc.js';
import Result from './Result.js';
import PrevRaces from './PrevRaces.js';
import './styles/Setup.css';
import './styles/Header.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      stations:[],
      name: '',
      description: "",
      race: {
        startPoint:'',
        endPoint:'',
        selectedCheckpoint:[]
      },
      firebaseTest:{
        name:'Maeesha',
        description:'Maeesha Race',
        startPoint: 'Yonge st.',
        endPoint: 'Bloor st.',
        selectedCheckpoint: ['Bathurst', 'Spadina', 'Queen']
      }
    }
  }

  componentDidMount(){
    // const dbRef = firebase.database().ref();
    // dbRef.push(this.state.firebaseTest);
  }

  getStations = () => {
    console.log('called');
    return axios({
      method: 'GET',
      url: 'http://api.citybik.es/v2/networks/toronto',
      dataResponse: 'json'
    })
    .then((response) => {
      console.log(response)
      const stations = response.data.network.stations;
      const stationArr = [];
      stations.forEach((item)=>{
        stationArr.push(item);
      })
      console.log("first then")
      this.setState({
        stations:stationArr
      })
      return stationArr;
    })
    .catch(error => {
      console.log('error');
    });
  }
  
  printSelect = () => {
    this.getStations()
    .then((result) => {
      console.log("second then");
      const newArray = result.map((item)=>{
        return <option value={item.name}>{item.name}</option>
        // return ({value: item.name, label: item.name})
      })
      console.log(newArray);
      return newArray;
    })
    .catch((error)=>{
      console.log(error);
    })
    
  }
  
  getStationsFromFirbase = () => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', res => {
      console.log(res.val());
      const data = res.val();
      const temArr = [];

      for (let key in data) {
        temArr.push(data[key])
      }

      const stationsObj = temArr[0];

      let stationsOptions = stationsObj.map((station) => {
        return station.name
      })

      console.log(stationsOptions);
      return stationsOptions;
    })
  }

  upDateName = (e) => {
    const userName = e.target.value
    this.setState({
      name: userName
    })
  }

  upDateDesc = (e) => {
    const userDesc = e.target.value
    this.setState({
      description: userDesc
    })
  }

  handleStartChange = (event) => {
    console.log("start change");
    this.setState({
      race:
      {
        ...this.state.race,
        startPoint: event.target.value
      }
    });
  }


  handleEndChange = (event) => {
    console.log("End Change");
    this.setState({
      race:
      {
        ...this.state.race,
        endPoint: event.target.value
      }
    });
  }

  handleCheckPointChange = (event) => {
    this.setState({
      race:{selectedCheckpoint: event.target.value}
    });
  }

  handleSaveRace = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();
    const savedRace = {
      name: this.state.name,
      description: this.state.description,
      startPoint: this.state.race.startPoint,
      endPoint: this.state.race.endPoint,
      selectedCheckpoint: this.state.race.selectedCheckpoint
      }
    
      dbRef.push(savedRace);
    }


  render(){
    return (
      <div className="App">
        <header className="headerContent">
          <nav className="clearfix">
            <ul>
              <li className="home"><a href="#">Home</a></li>
              <li className="prevRaces"><a href="#">Previous Races</a></li>
            </ul>
          </nav>
          <h1>Welcome to Toronto Bike Share Races</h1>
          <button>Create Race</button>
        </header>

        <NameDesc takeName={this.upDateName} takeDesc={this.upDateDesc}/>
        <RacePoints 
        handleOptionChange={this.handleOptionChange}
        handleUserStart={this.handleStartChange}
        handleUserEnd={this.handleEndChange}
        userStart={this.state.race.startPoint}
        userEnd={this.state.race.endPoint}
        />
       
        <Result 
        name={this.state.name} 
        description={this.state.description} 
        startP={this.state.race.startPoint} 
        endP={this.state.race.endPoint}
        // checkP={this.state.checkPoint}
        // handleSave={this.handleSaveRace}
        />

        <PrevRaces />

      </div>
    );
  }
}

export default App;
