import React, { Component } from 'react';
import firebase from './firebase.js';

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
                {
                    <div className="wrapper">
                        <h2>Your Race Information</h2>
                        {
                            <div className="raceInfo">
                                <h3>Name & Description</h3>
                                <div className="racePoints">
                                </div>
                                <p className="laws">Please obey all traffic laws!</p>
                            </div>
                        }
                    </div>
                }
            </section>
        );
    }
}

export default Result
