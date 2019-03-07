import React, { Component } from 'react';
import firebase from './firebase.js';
import './RacePoints.css'
import Select from 'react-select';
import axios from 'axios';

class RacePoints extends Component {
    constructor (){
        super()
        this.state = {    
            stations: [],
            options: []
        }
    }

    componentDidMount(){
        this.getStations()
        .catch(() => {
            this.getStationsFromFirebase();
        })
    }

    //API call
    getStations = () => {
        return axios({
            method: 'GET',
            url: 'http://api.citybik.es/v2/networks/toronto',
            dataResponse: 'json'
        })
            .then((response) => {
                const stations = response.data.network.stations;
                const stationArr = [];
                stations.forEach((item) => {
                    stationArr.push(item);
                })
                this.setState({
                    stations: stationArr
                })

                console.log('AXIO succed')
                let stationsOptions = stationArr.map((station) => {
                    return {
                        label: station.name,
                        value: station.name
                    }
                })

                this.setState({
                    options: stationsOptions
                });

            })
    }

    //PlanB, fetch data from firebase
    getStationsFromFirebase = () => {
        console.log('plan B');
        const dbRef = firebase.database().ref();
        dbRef.on('value', res => {
            const data = res.val();
            const temArr = [];

            for (let key in data) {
                temArr.push(data[key])
            }

            const stationsObj = temArr[0];

            let stationsOptions = stationsObj.map((station) => {
                return {
                    label: station.name,
                    value: station.name
                }
            })

            this.setState({
                options: stationsOptions
            });
        })
    }
    
    
    render() {
    const {startPoint, endPoint, selectedCheckpoint } = this.state;
      return (
          <div className="racePointsComponent">
              <nav className="clearfix">
                  <ul>
                      <li className="home"><a href="#home">Home</a></li>
                      <li className="prevRaces"><a href="#" onClick={this.props.handlePrev}>Previous Races</a></li>
                  </ul>
              </nav>
          {
        <section className="RacePoints clearfix">
            <div className="addPoints">
                <h2>Create route</h2>
                <ul>
                    <li>
                        <form className="creatStartEnd">
                            <label className="" htmlFor="startingPoint">Enter starting Point</label>
                            <Select 
                                defaultValue = "Select Start"
                                name="startingPoint"
                                value={this.props.value}
                                onChange={this.props.handleUserStart}
                                options={this.state.options}
                                />
                            <label className="" htmlFor="endPoint">Enter Finish Line</label>
                            <Select 
                                name="endPoint"
                                value={this.props.value}
                                onChange={this.props.handleUserEnd}
                                options={this.state.options}
                                />
                        </form>
                    </li>
                    <li>
                        <form className="createCheckPoints" onSubmit={this.props.handleAddCheckPoint}>
                            <label className="" htmlFor="checkPoint">Select Check Points Below</label>
                            <Select 
                                name="selectedCheckpoint"
                                value={this.state.value}
                                onChange={this.props.handleUserCheckPoint}
                                options={this.state.options}
                                />
                            <button type="submit">Add check Point</button>
                        </form>
                    </li>
                </ul>
            </div> {/*  END OF ADD POINTS */}

            <div className="viewPoints">
                <h2>Race route</h2>
                <ul>
                    <li>Start: {this.props.userStart}</li>
                    {
                        this.props.raceArray.map((checkpoint, i)=>{
                            return (
                                <li key={i}>{checkpoint}
                                    <span className="delete" onClick={() => this.props.handleDeleteCheckpoint(i)}><i className="far fa-trash-alt"></i></span>
                                </li>
                            )
                        })
                    }
                      <li>Finish: {this.props.userEnd}</li>
                </ul>
            </div>
            <form className="submitRace" onSubmit={this.submitRace}>
                <button type="submit">Create race</button>
            </form>
        </section>
              }
        </div>
      );
    }
}

export default RacePoints;
