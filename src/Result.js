import React, { Component } from 'react';
import firebase from './firebase.js';
import './styles/Result.css';

<<<<<<< HEAD
class Result extends Component {}

export default Result;
=======
class RaceInfo extends Component {
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
                            <h3>Name & Description</h3>
                                <div className="racePoints">
                                    <p>Display race points here...</p>
                                    <button className="save">Save Race</button>
                                </div>
                                <p className="laws">Please obey all traffic laws!</p>
                            </div>
                        }
                        <button className="prevRaces">Previous Races</button>
                    </div>
                }
            </section>
        );
    }
}

export default RaceInfo
>>>>>>> faf6ac5f23937d00883f66b35a60547d1536a7f3
