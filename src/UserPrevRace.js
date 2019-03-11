import React, { Component } from 'react';
import firebase from './firebase.js';
import Animation from './Animation.js';
import './styles/PrevRaces.css';
import raceEnd from './raceEnd.png';
import logo from './logo.png';

class UserPrevRace extends Component {
    constructor() {
        super()
        this.state = {
            saved: [],
            view: null
        }
    }

    componentDidMount() {
        const authID = this.props.authID
        const itemsRef = firebase.database().ref(`authUsers/${authID}`);
        itemsRef.on('value', (saved) => {
            let newRace = [];

            const data = saved.val();
            for (let key in data) {
                newRace.push(data[key]);
            }
            const updateRaces = newRace.reverse();

            this.setState({
                saved: updateRaces
            })

            setTimeout(this.showRaces, 1500);
        })
    };

    showRaces = () => {
        this.setState({
            view: true
        })
    }

    render() {
        if (this.state.view) {
            return (
                <div className="wrapper">
                    <section className="prevRacesComponent">
                        <header>
                            <nav className="clearfix">
                                <h2 className="logo"><span className="t">T</span><img src={logo} alt="Toronto bike share logo." /> Bike Share Races</h2>
                                <ul>
                                    <li className="home"><a onClick={this.props.handleBack} href="#">Home</a></li>
                                    <li className="prevRaces" onClick={this.handlePrevRace}><a href="#">Previous Races</a></li>
                                </ul>
                            </nav>
                        </header>
                        <h2 className="prevRaceTitle">Here Are Your Previous Races <i class="fas fa-bicycle"></i></h2>
                        <div className="savedRacesContainer clearfix">
                            {
                                this.state.saved.map((races) => {
                                    return (
                                        <div className="savedRaces">
                                            <h3>Race Name: {races.name}</h3>
                                            <p>Description: {races.description}</p>
                                            <p><i class="fas fa-flag-checkered"></i> Startpoint: {races.startPoint}</p>
                                            <ul>
                                                {races.selectedCheckpoint ?
                                                    races.selectedCheckpoint.map((checkpoint) => {
                                                        return <li>{checkpoint}</li>
                                                    })
                                                    : null}
                                            </ul>
                                            <p><img src={raceEnd} alt="Race Finish Banner" /> Endpoint: {races.endPoint}</p>
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </section>
                </div>
            )
        } else {
            return <Animation />;
        }
    }
}

export default UserPrevRace