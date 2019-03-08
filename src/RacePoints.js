import React, { Component } from 'react';
import firebase from './firebase.js';
import './RacePoints.css'
import Select from 'react-select';

class RacePoints extends Component {
    constructor() {
        super()
        this.state = {
            // stations: [],
            // options: []
        }
    }

      // ***** UPDATES STARTED HERE ***** //

    componentDidMount() {
        this.props.getStations()
            .catch(() => {
                this.props.getStationsFromFirebase();
            })
    }

    render() {
        const { startPoint, endPoint, selectedCheckpoint } = this.state;
        return (
            <section className="RacePoints clearfix">
                <h2>Race route</h2>
                <div className="addPoints">
                    <h2>Add starting & finish points</h2>
                    <ul>
                        <li>
                            <form className="creatStartEnd">
                                <label className="" htmlFor="startingPoint">Enter starting Point</label>
                                <Select
                                    defaultValue="Select Start"
                                    name="startingPoint"
                                    value={this.props.value}
                                    onChange={this.props.handleUserStart}
                                    options={this.props.options}
                                />
                                <label className="" htmlFor="endPoint">Enter Finish Line</label>
                                <Select
                                    name="endPoint"
                                    value={this.props.value}
                                    onChange={this.props.handleUserEnd}
                                    options={this.props.options}
                                />
                            </form>
                        </li>
                        <li>
                            {/* <a href="#" onClick={(event) => { func1(); func2();}}>Test Link</a> */}
                            <h2>Add race checkpoints</h2>
                            <form className="createCheckPoints" onSubmit={this.props.handleAddCheckPoint}>
                                <label className="" htmlFor="checkPoint">Select Check Points Below</label>
                                <Select
                                    name="selectedCheckpoint"
                                    value={this.state.value}
                                    onChange={this.props.handleUserCheckPoint}
                                    options={this.props.options}
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
                            this.props.raceArray.map((checkpoint, i) => {
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
                <div className="submitRace">
                    <button onClick={this.props.scrollResults}>Next</button>
                </div>
            </section>
        );

    }
}
// onSubmit={this.submitRace}
export default RacePoints;
