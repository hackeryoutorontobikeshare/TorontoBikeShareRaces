import React, { Component } from 'react';
import firebase from './firebase.js';
import Animation from './Animation.js';

class UserPrevRace extends Component {
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
        const authID = this.props.authID
        const itemsRef = firebase.database().ref(`authUsers/${authID}`);
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
                                <ul>
                                    <li className="home"><a onClick={this.props.handleBack} href="#">Home</a></li>
                                </ul>
                            </nav>
                        </header>
                        <h2>Here Are Your Previous Races</h2>
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
        } else {
            return <Animation />;
        }
    }
}

export default UserPrevRace