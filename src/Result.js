import React, { Component } from 'react';
import firebase from './firebase.js';
import './styles/Result.css';

class RaceInfo extends Component {
    
    handlePrevRaces = () => {
        console.log('clicked prev race btn');
    }

    handleSaveRace = () => {
        console.log('clicked save race btn');
    }

    constructor() {
        super()
        this.state = {
            Info: []
        }
    }
    render() {

        return (
            <section className="resultComponent">
            <header>
                <nav className="clearfix">
                    <ul>
                        <li className="home"><a href="#">Home</a></li>
                        <li className="prevRaces"><a href="#">Previous Races</a></li>
                    </ul>
                </nav>
            </header>
                {
                    <div className="wrapper">
                        <h2>Your Race Information</h2>
                        {
                            <div className="raceInfo">
                                <h3>{this.props.name}</h3>
                                <p>{this.props.description}</p>
                                <div className="racePoints">
                                    <p className="startP">{this.props.startP}</p>
                                    <p className="checkP">{this.props.checkP}</p>
                                    <p className="endP">{this.props.endP}</p>
                                    <button onClick={this.handleSaveRace} className="save">Save Race</button>
                                </div>
                                <p className="laws">Please obey all traffic laws while participating in a race!</p>
                            </div>
                        }
                        <button onClick={this.handlePrevRaces} className="prevRaces">Previous Races</button>
                    </div>
                }
            </section>
        );
    }
}

export default RaceInfo
