import React, { Component } from 'react';
import firebase from './firebase';
import './styles/PrevRaces.css';
import Animation from './Animation.js'

class PrevRaces extends Component {
    constructor() {
        super()
        this.state = {
            saved: [],
            view: null
        }
    }

    onPrevRaces = () => {
        const dbRef = firebase.database().ref();

        dbRef.push();
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

            for (let i = 1; i < newState.length; i++) {
                savedRaces.push(newState[i]);
            }

            const updateRaces = savedRaces.reverse();

            this.setState({
                saved: updateRaces
            })

            setTimeout(this.showRaces,1500);
        })
    };

    showRaces = () =>{
        this.setState({
            view: true
        })
    }

    render() {
        if (this.state.view){
            return (
                <div className="wrapper">
                    <section className="prevRacesComponent">
                        <li className="home"><a onClick={this.props.handleBack} href="#">Home</a></li>
                        <h2>Previous Races</h2>
                            {
                                this.state.saved.map((races) => {
                                return (
                                        <div>
                                            <h3>{races.name}</h3>
                                            <p>{races.description}</p>
                                            <p>{races.startPoint}</p>
                                            <ul>
                                            {races.selectedCheckpoint?
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
        }else{
            return <Animation />;
        }
    }
}

export default PrevRaces