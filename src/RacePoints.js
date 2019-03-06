import React, { Component } from 'react';
// import firebase from './firebase.js';
import './RacePoints.css'
// import Select from 'react-select';

class RacePoints extends Component {
    constructor (){
        super()
        this.state = {    
            startPoint: "Select a starting point",
            endPoint: "Select a finish line",
            selectedCheckpoint: "",
            stationArray: [
                "Station1",
                "Station2",
                "Station3",
                "Station4",
                "Station5",
                "Station6",
                "Station7",
                "Station8",
                "Station9",
                "Station10",
            ],   
            raceArray: [],
            userRace: {}
        }
    }

    // handleStartChange = (event) => {
    //     console.log("start change");
    //     this.setState({
    //         startPoint: event.target.value
    //     });
    // }


    // handleEndChange = (event) => {
    //     console.log("End Change");
    //     this.setState({
    //         endPoint: event.target.value
    //     });
    // }

    handleCheckPointChange = (event) => {
        console.log("Check Point Change");
        this.setState({
            selectedCheckpoint: event.target.value
        });
    }

    addCheckPoint = (event) => {
        event.preventDefault();
        console.log("check Point added!");
        console.log(this.state.stationArray);
        let changeArray = this.state.raceArray;
        if (this.state.selectedCheckpoint == ""){
            changeArray.push(this.state.stationArray[0]);
            this.state.stationArray.splice(0, 1);
        } else {
            changeArray.push(this.state.selectedCheckpoint);
            let index = this.state.stationArray.indexOf(this.state.selectedCheckpoint);
            this.state.stationArray.splice(index, 1);
        }
        this.setState({
            raceArray: changeArray
        });
        console.log(this.state.stationArray);
    }

    submitRace = (event) => {
        event.preventDefault();
        let userRace = {
            start: this.state.startPoint,
            end: this.state.endPoint,
            checkpoints: this.state.raceArray
        };
        this.setState({
            userRace: userRace
        });
        console.log(userRace);
        console.log("Race submitted");
    }

    render() {
      return (
        <section className="RacePoints clearfix">
            {/* <h2>Pace Points Section</h2> */}
            <div className="addPoints">
                <h2>Create route</h2>
                <ul>
                    <li>
                        <form className="creatStartEnd">
                            <label htmlFor="startingPoint">Enter starting Point</label>
                            <select name="startingPoint" onChange={this.props.handleUserStart} value={this.props.userStart}>
                                {
                                    this.state.stationArray.map((station, i) =>{
                                        return <option key={i} value={station}>{station}</option>
                                    })
                                }
                                {/* {this.props.printOptions()} */}
                            </select>
                            <label htmlFor="endPoint">Enter Finish Line</label>
                              <select name="endPoint" onChange={this.props.handleUserEnd} value={this.props.userEnd}>
                                {
                                    this.state.stationArray.map((station, i) =>{
                                        return <option key={i} value={station}>{station}</option>
                                    })
                                }
                            </select>
                        </form>
                    </li>
                    <li>
                        <form className="createCheckPoints" onSubmit={this.addCheckPoint}>
                        <label htmlFor="checkPoint">Add Check Point</label>
                            <select name="checkPoint" onChange={this.handleCheckPointChange} value={this.state.selectedCheckpoint}>
                                <option value="" disabled selected>Select check point</option>
                                {
                                    this.state.stationArray.map((station, i) =>{
                                        return <option key={i} value={station}>{station}</option>
                                    })
                                }
                            </select>
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
                                <span className="delete"><i className="far fa-trash-alt"></i></span>
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
