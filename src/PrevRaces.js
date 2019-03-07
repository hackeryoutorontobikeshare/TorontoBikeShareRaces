import React, { Component } from 'react';
import firebase from './firebase';
import './styles/PrevRaces.css';

class PrevRaces extends Component {
    constructor() {
        super()
        this.state = {
            saved: []
        }
    }

    onPrevRaces = () => {
        const dbRef = firebase.database().ref();

        dbRef.push();
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref();
        itemsRef.on('value', (saved) => {
            console.log(saved.val());

            let newState = [];

            const data = saved.val();

            for (let key in data) {
                newState.push(data[key]);
            }

            const savedRaces = []

            for (let i = 1; i < newState.length; i++) {
                savedRaces.push(newState[i]);
            }
            console.log(savedRaces);

            const updateRaces = savedRaces.reverse();

            this.setState({
                saved: updateRaces
            })
        })

    };

    render() {

        return (
            <div className="wrapper">
                <section className="prevRacesComponent">
                    <nav className="clearfix">
                        <ul>
                            <li className="home"><a href="#" onClick={this.props.handleBack}>Home</a></li>
                        </ul>
                    </nav>
                    <h2>Previous Races</h2>
                    {
                        this.state.saved.map((races) => {
                            return (
                                <div>
                                    <h3>{races.name}</h3>
                                    <p>{races.description}</p>
                                    <p>{races.startPoint}</p>
                                    <ul>
                                        {races.selectedCheckpoint ?
                                            races.selectedCheckpoint.map((checkpoint) => {
                                                return <li>{checkpoint}</li>
                                            })
                                            : null}
                                    </ul>
                                    <p>{races.endPoint}</p>
                                </div>
                            )
                        })

                    }
                </section>
                <button onClick={this.props.handleBack}>Back to Home</button>
            </div>
        )
    }
}

export default PrevRaces