import React, { Component } from 'react';
import axios from 'axios';
import { posix } from 'path';


class RandomRace extends Component {
    constructor() {
        super();
        this.state = {
            longitude: 0,
            latitude: 0,
            hasCoords: false,
            nearestStn: "",
            nearestHundred: []
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
                console.log(totalDist, "this is the totalDist array");
                let nearStn = totalDist[0].name;
                let nearestHund = totalDist.splice(1, 100);
                console.log(nearestHund, "this is the nearest hundred");
                console.log(nearStn, "this is the nearest station");
                this.setState({
                    nearestStn: nearStn,
                    nearestHundred: []
                })

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

    // randomRace = () => {
    //     let startPoint = this.state.nearestStn;
    //     let checkOne;
    //     let checkTwo;
    //     let checkThree;
    //     let finish;
    //     checkOne = Math.floor(Math.random() * (totalDist.length - 257));
    //     console.log(checkOne);
    // }


    render() {
        return (
            <div>
                {this.state.hasCoords ? (<div><button onClick={this.getStationCoords}>Find nearest station</button> <h2>Your nearest station is: {this.state.nearestStn}</h2><button> Random Race</button></div>) : (<div></div>)}
            </div>
        )
    }

}


export default RandomRace;
