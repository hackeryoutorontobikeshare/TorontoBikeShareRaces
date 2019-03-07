import React, { Component } from 'react';
import './styles/NameDesc.css';
import './styles/Setup.css';

class NameDesc extends Component {
    render() {
        return (
            <section className="nameDesc">
                <nav className="clearfix">
                    <ul>
                        <li className="home"><a href="#home">Home</a></li>
                        <li className="prevRaces" onClick={this.props.handlePrev}><a href="#">Previous Races</a></li>
                    </ul>
                </nav>
                <h2 className="ndTitle">create race name <span className="noCaps">and</span> description</h2>
                <div className="ndWrapper">
                    <form className="ndForm">
                        <span className="ndSpan">
                            <label htmlFor="name">Name</label>
                        </span>
                        <span className="ndSpan">
                            <input type="text" id="name" placeholder="Enter name" onChange={this.props.takeName} />
                        </span>
                        <span className="ndSpan">
                            <label htmlFor="desc">Description</label>
                        </span>
                        <span className="ndSpan">
                            <input type="text" id="desc" placeholder="Enter description" onChange={this.props.takeDesc} />
                        </span>
                    </form>
                </div>
                <button className="ndButton" onClick={this.props.scrollRacePoints}>Next</button>
            </section>
        );
    }
}

export default NameDesc;


