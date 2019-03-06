import React, { Component } from 'react';
import axios from 'axios';
import RacePoints from './RacePoints.js';
import NameDesc from './NameDesc.js';
import Result from './Result.js';
import './styles/Setup.css';

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
        checkPoint:[]
      },
      test:[1,2,3,4,5]
    }
  }

  // componentDidMount(){
  //   axios({
  //     method: 'GET',
  //     url: 'http://api.citybik.es/v2/networks/toronto',
  //     dataResponse: 'json'
  //   })
  //     .then((response) => {
  //       const stations = response.data.network.stations;
  //       const stationArr = [];
  //       stations.forEach((item) => {
  //         stationArr.push(item);
  //       })

  //       this.setState({
  //         stations: stationArr
  //       })
  //       // return stationArr;
  //     })
  // }

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
  }


  printSelect = () => {
    this.getStations()
      .then((result) => {
        console.log("second then")
        const newArray = result.map((item)=>{
          return <option value="item.name">item.name</option>
          // return ({value: item.name, label: item.name})
      })
        return newArray;
      })
      .catch((error)=>{
        console.log(error);
      })
    
  }

  handleOptionChange = (selectedValue) => {
    // this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
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

  render(){
    return (
      <div className="App">
        <header>
          <h1>Welcome to Toronto Bike Share Races</h1>
          <button>Create Race</button>
        </header>

        <NameDesc takeName={this.upDateName} takeDesc={this.upDateDesc}/>
        <RacePoints printOptions={this.printSelect} handleOptionChange={this.handleOptionChange}/>
       
        <Result 
        name={this.state.name} 
        description={this.state.description} 
        startP={this.state.race.startPoint} 
        endP={this.state.race.endPoint}
        // checkP={this.state.checkPoint}
        />

      </div>
    );
  }
}

export default App;
