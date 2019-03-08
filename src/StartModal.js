import React, { Component } from 'react';
import firebase from './firebase.js';
import axios from 'axios';

class Modal extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            stations: []
        }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        return axios({
            method: 'GET',
            url: 'http://api.citybik.es/v2/networks/toronto',
            dataResponse: 'json'
        })
        .then((response) => {
            const stations = response.data.network.stations;
            const stationArr = [];
            stations.forEach((item) => {
                stationArr.push(item);
            })
            this.setState({
                stations: stationArr
            })

            const filter = this.props.userStart
            const matchStation = stationArr.filter(station => {
                return station.name === filter 
            })
            console.log(matchStation);
        })
    }


    render() {
        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    // contentLabel="Example Modal"
                >
                    <button onClick={this.closeModal}>close</button>
                    <div>
                        <h2>Real-time availability of bikes</h2>
                        <p>At this station: {this.props.userStart} there are {} bikes left</p>
                    </div>
                </Modal>
            </div>
        )
    }

}



export default Modal;