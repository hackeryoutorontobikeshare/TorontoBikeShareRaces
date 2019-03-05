import React, { Component } from 'react';
import './styles/NameDesc.css';
import './styles/Setup.css';
import firebase from './firebase.js';

class NameDesc extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: ""
        }

    }

    upDateName = (e) => {
        const userName = e.target.value
        this.setState({
            name: userName
        })
    }

    upDateDesc = (e) => {
        const userDesc = e.target.value
        this.setState({
            description: userDesc
        })
    }

    upDateState = () => {
        console.log(this.state);
    }


    render() {
        return (
            <section className="nameDesc">
                <h2 className="ndTitle">create race name <span className="noCaps">and</span> description</h2>
                <div className="ndWrapper">
                    <form className="ndForm">
                        <span className="ndSpan">
                            <label htmlFor="name">Name</label>
                        </span>
                        <span className="ndSpan">
                            <input type="text" id="name" placeholder="Enter name" onChange={this.upDateName} />
                        </span>
                        <span className="ndSpan">
                            <label htmlFor="desc">Description</label>
                        </span>
                        <span className="ndSpan">
                            <input type="text" id="desc" placeholder="Enter description" onChange={this.upDateDesc} />
                        </span>
                    </form>
                </div>
                <button className="ndButton" onClick={this.upDateState}>Next</button>
            </section>
        );
    }
}

export default NameDesc;