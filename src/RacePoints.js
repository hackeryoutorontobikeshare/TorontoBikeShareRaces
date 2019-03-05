import React, { Component } from 'react';
import firebase from './firebase.js';
import './RacePoints.css'

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
            raceArray: []
        }
    }

    handleStartChange = (event) => {
        console.log("start change");
        this.setState({
            startPoint: event.target.value
        });
    }


    handleEndChange = (event) => {
        console.log("End Change");
        this.setState({
            endPoint: event.target.value
        });
    }

    handleCheckPointChange = (event) => {
        console.log("Check Point Change");
        this.setState({
            selectedCheckpoint: event.target.value
        });
    }

    addCheckPoint = (event) => {
        event.preventDefault();
        console.log("check Point added!");
        let changeArray = this.state.raceArray;
        if (this.state.selectedCheckpoint == ""){
            changeArray.push(this.state.stationArray[0]);
        } else {
            changeArray.push(this.state.selectedCheckpoint);
        }
        this.setState({
            raceArray: changeArray
        });
    }


    render() {
      return (
        <section className="RacePoints clearfix">
            <h2>Pace Points Section</h2>
            <div className="addPoints">
                <h2>Add check points</h2>
                <ul>
                    <li>
                        <form className="creatStartEnd">
                            <label htmlFor="startingPoint">Enter starting Point</label>
                            <select name="startingPoint" onChange={this.handleStartChange} value={this.state.startPoint}>
                                {
                                    this.state.stationArray.map((station, i) =>{
                                        return <option key={i} value={station}>{station}</option>
                                    })
                                }
                            </select>
                            <label htmlFor="endPoint">Enter Finish Line</label>
                            <select name="endPoint" onChange={this.handleEndChange} value={this.state.endPoint}>
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
                <h2>View race points</h2>
                <ul>
                    <li>Start: {this.state.startPoint}</li>
                    {
                        this.state.raceArray.map((checkpoint, i)=>{
                            return (
                                <li key={i}>{checkpoint}
                                <span className="delete"><i className="far fa-trash-alt"></i></span>
                                </li>
                            )
                        })
                    }
                    <li>Finish: {this.state.endPoint}</li>
                </ul>
            </div>
        </section>
      );
    }
}

export default RacePoints;
