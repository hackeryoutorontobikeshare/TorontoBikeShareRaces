import React, { Component } from 'react';
import firebase from './firebase.js';

class NameDesc extends Component {
    render() {
        return (
            <section className="NameDesc">
                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                    <label htmlFor="desc">Description</label>
                    <textarea rows="4" columns="50" id="desc"></textarea>
                </form>
            </section>
        );
    }
}

export default NameDesc;