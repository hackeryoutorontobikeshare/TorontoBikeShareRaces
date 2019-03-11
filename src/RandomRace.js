import React, { Component } from 'react';
import axios from 'axios';
import { posix } from 'path';


class RandomRace extends Component {
    constructor() {
        super();
        this.state = {
            longitude: 0,
            latitude: 0,
            hasCoords: false
        }
    }

    componentDidMount() {
        this.getLocation()
        // this.getStationCoords()
    }

    //API call
    getStationCoords = () => {
        return axios({
            method: 'GET',
            url: 'http://api.citybik.es/v2/networks/toronto',
            dataResponse: 'json'
        })
            .then((response) => {
                console.log(response.data.network.stations, "this is the response data stations");
                const stations = response.data.network.stations;
                const stationCoordsArr = [];
                const totalDist = [];
                stations.forEach((station) => {
                    console.log(this.state.latitude);

                    let latDist = Math.abs(station.latitude - this.state.latitude);
                    let lngDist = Math.abs(station.longitude - this.state.longitude);
                    let totDist = latDist + lngDist;
                    let stn = {
                        name: station.name,
                        totalDist: totDist
                    }

                    totalDist.push(stn)
                })
                totalDist.sort(function (a, b) {
                    return a.totalDist - b.totalDist
                })
                console.log(totalDist)

            })
    }




    getLocation = () => {
        navigator.geolocation.getCurrentPosition((location) => {
            if (location.coords) {
                let lat = location.coords.latitude;
                let long = location.coords.longitude;
                console.log(lat, long)
                this.setState({
                    longitude: long,
                    latitude: lat,
                    hasCoords: true
                }, () => {
                    console.log(this.state, "this is the state")
                })
            }
        })
    }


    render() {
        return (
            <div>
                {this.state.hasCoords ? (<button onClick={this.getStationCoords}>This is the location button</button>) : (<div></div>)}
            </div>
        )
    }

}


export default RandomRace;
