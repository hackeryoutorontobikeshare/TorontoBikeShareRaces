import React, { Component } from 'react';
import firebase from './firebase';
import './styles/PrevRaces.css';
import Animation from './Animation.js'
import './styles/Setup.css';
import raceEnd from './raceEnd.png';
import logo from './logo.png';

class PrevRaces extends Component {
    constructor() {
        super()
        this.state = {
            saved: [],
            races:[],
            view: null
        }
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref();
        itemsRef.on('value', (saved) => {
            let newState = [];

            const data = saved.val();

            for (let key in data) {
                newState.push(data[key]);
            }

            const savedRaces = []

            for (let i = 1; i < newState.length-1; i++) {
                savedRaces.push(newState[i]);
            }

            const updateRaces = savedRaces.reverse();

            this.setState({
                saved: updateRaces,
                races: updateRaces
            })

            setTimeout(this.showRaces,1500);
        })
    };

    showRaces = () =>{
        this.setState({
            view: true
        })
    }

    sortByNums = () =>{
        const races = this.state.saved;
        console.log(races);
        const noCheckpoint = [];
        const hasCheckpoint = [];
        
        races.forEach((race)=>{
            if(race.selectedCheckpoint){
                hasCheckpoint.push(race);
            } else {
                noCheckpoint.push(race);
            }
        })

        const sortRaces = hasCheckpoint.sort((raceA, raceB) => {
            return raceB.selectedCheckpoint.length - raceA.selectedCheckpoint.length;
        })
        
        console.log(sortRaces);
        const newSortedRaces = hasCheckpoint.concat(noCheckpoint);
        this.setState({
            saved: newSortedRaces
        })
    }

    sortByTime = () => {
        this.setState({
            saved: this.state.races
        })
    }

    render() {
        if (this.state.view){
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
                        <h2 className="prevRaceTitle">Previous Races <i class="fas fa-bicycle"></i></h2>
                        <button onClick={this.sortByNums}>Sort By Checkpoints</button>
                        <button onClick={this.sortByTime}>Sort By Created Time</button>
                        <div className="savedRacesContainer clearfix">
                            {
                                this.state.saved.map((races) => {
                                return (
                                        <div className="savedRaces">
                                            <p>Created at: {races.timeCreated}</p>
                                            <h3>Race Name: {races.name}</h3>
                                            <p>Description: {races.description}</p>
                                            <p><i class="fas fa-flag-checkered"></i> Startpoint: {races.startPoint}</p>
                                            <ul>
                                            {races.selectedCheckpoint?
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
        }else{
            return <Animation />;
        }
    }
}

export default PrevRaces