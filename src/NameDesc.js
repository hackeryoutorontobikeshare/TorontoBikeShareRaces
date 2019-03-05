import React, { Component } from 'react';
import './styles/NameDesc.css';
import firebase from './firebase.js';

class NameDesc extends Component {
    render() {
        return (
            <section className="nameDesc">
                <h1 className="ndTitle">create race name <span className="noCaps">and</span> description</h1>
                <div className="ndWrapper">
                    <form className="ndForm">
                        <span className="ndSpan">
                            <label htmlFor="name">Name</label>
                        </span>
                        <span className="ndSpan">
                            <input type="text" id="name" placeholder="Enter name" />
                        </span>
                        <span className="ndSpan">
                            <label htmlFor="desc">Description</label>
                        </span>
                        <span className="ndSpan">
                            <input type="text" id="desc" placeholder="Enter description" />
                        </span>
                    </form>
                </div>
                <button className="ndButton">Next</button>
            </section>
        );
    }
}

export default NameDesc;