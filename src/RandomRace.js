import React, { Component } from 'react';
import { posix } from 'path';


class RandomRace extends Component {
    constructor() {
        super();
        this.state = {
            longitude: 0,
            latitude: 0
        }
    }


    getLocation = () => {
        navigator.geolocation.getCurrentPosition((location) => {
            if (location.coords) {
                let lat = location.coords.latitude;
                let long = location.coords.longitude;
                console.log(lat, long)
                this.setState({
                    longitude: long,
                    latitude: lat
                }, () => {
                    console.log(this.state, "this is the state")
                })
            }
        })
    }


    render() {
        return (
            <div>
                <button onClick={this.getLocation}>This is the location button</button>
                <button onClick={this.logInfo}>this is the log button</button>
            </div>
        )
    }

}


export default RandomRace;
