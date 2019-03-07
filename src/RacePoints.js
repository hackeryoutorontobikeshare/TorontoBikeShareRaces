import React, { Component } from 'react';
import firebase from './firebase.js';
import './RacePoints.css'
import Select from 'react-select';

class RacePoints extends Component {
    constructor (){
        super()
        this.state = {    
            // startPoint: "Start point",
            // endPoint: "End point",
            selectedCheckpoint: "",
            raceArray: [],
            userRace: {},
            stations: [],
            options: []
        }
    }

    componentDidMount(){
        const dbRef = firebase.database().ref();
        dbRef.on('value', res => {
            // console.log(res.val());
            const data = res.val();
            const temArr = [];

            for (let key in data) {
                temArr.push(data[key])
            }

            const stationsObj = temArr[0];

            let stationsOptions = stationsObj.map((station) => {
                return {
                    label: station.name,
                    value: station.name}
            })
            
            this.setState({
                options: stationsOptions
            });
        })
    }

    handleCheckPointChange = (event) => {
        this.setState({
            selectedCheckpoint: event.label
        });
    }

    addCheckPoint = (event) => {
        event.preventDefault();
        // console.log("check Point added!");
        let changeArray = this.state.raceArray;
        changeArray.push(this.state.selectedCheckpoint);

        this.setState({
            raceArray: changeArray
        });
        // console.log(this.state.stationArray);
    }

    deleteCheckpoint = (index) => {
        console.log(index);
        console.log("CLICKED!!!");
        let changeArray = this.state.raceArray;
        changeArray.splice(index, 1);
        this.setState({
            raceArray: changeArray
        });
    }

    submitRace = (event) => {
        console.log("submit race");
        event.preventDefault();
        let userRace = {
            name: this.props.name,
            description: this.props.description,
            start: this.props.userStart,
            end: this.props.userEnd,
            checkpoints: this.state.raceArray
        };
        console.log(userRace);
    }

    render() {
    const {startPoint, endPoint, selectedCheckpoint } = this.state;
      return (
        <section className="RacePoints clearfix">
            <div className="addPoints">
                <h2>Create route</h2>
                <ul>
                    <li>
                        <form className="creatStartEnd">
                            <label className="" htmlFor="startingPoint">Enter starting Point</label>
                            <Select 
                                name="startingPoint"
                                value={this.props.userStart}
                                onChange={this.props.handleUserStart}
                                options={this.state.options}
                                />
                            <label className="" htmlFor="endPoint">Enter Finish Line</label>
                            <Select 
                                name="endPoint"
                                value={this.props.userEnd}
                                onChange={this.props.handleUserEnd}
                                options={this.state.options}
                                />
                        </form>
                    </li>
                    <li>
                        <form className="createCheckPoints" onSubmit={this.addCheckPoint}>
                            <label className="" htmlFor="checkPoint">Select Check Points Below</label>
                            <Select 
                                name="selectedCheckpoint"
                                value={this.state.selectedCheckpoint}
                                onChange={this.handleCheckPointChange}
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
                        this.state.raceArray.map((checkpoint, i)=>{
                            return (
                                <li key={i}>{checkpoint}
                                <span className="delete" onClick={() =>this.deleteCheckpoint(i)}><i className="far fa-trash-alt"></i></span>
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
      );
    }
}

export default RacePoints;
