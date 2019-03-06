import React, { Component } from 'react';
// import firebase from './firebase.js';
import './styles/Result.css';
import raceEnd from './raceEnd.png'

class RaceInfo extends Component {
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
                        <div className="raceInfo">
                            <div className="container">
                                <h2>Your Race Information</h2>
                                <h3>Race Name: {this.props.name}</h3>
                                <p>Description: {this.props.description}</p>
                                <div className="racePoints">
                                    <p className="startP"><i class="fas fa-flag-checkered"></i> Starting Point: {this.props.startP}</p>
                                    <p className="checkP">Check Point: {this.props.checkP}</p>
                                    <p className="endP">
                                    <img src={raceEnd} alt="Race Finish Banner"/>
                                     Ending Point: {this.props.endP}</p>
                                    <button onClick={this.props.handleSave} className="save">Save Race</button>
                                </div>
                                <p className="laws"><i class="fas fa-exclamation-triangle"></i> Please obey all traffic laws while participating in a race! <i class="fas fa-exclamation-triangle"></i></p>
                            </div>
                        </div>
                    <button onClick={this.handlePrevRaces} className="prevRaces">Previous Races</button>
                </div>
                }
            </section>
        );
    }
}

export default RaceInfo
