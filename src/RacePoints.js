import React, { Component } from 'react';
import firebase from './firebase.js';
import './RacePoints.css'

class RacePoints extends Component {
    render() {
      return (
        <section className="RacePoints clearfix">
            <h2>Pace Points Section</h2>
            <div className="addPoints">
                <h2>Add check points</h2>
                <form className="createRaceForm">
                    <ul>
                        <li>
                            <label htmlFor="startingPoint">Enter starting Point</label>
                            <select id="startingPoint" type="text">
                                {/* Placeholder */}
                                <option value="Queen St">Queen St</option>
                                <option value="Dufferin St">Dufferin St</option>
                                <option value="King St">King St</option>
                                <option value="College St">College St</option>
                                {/* Placeholder */}
                                {
                                    this.props.OnRender
                                }
                            </select>                            
                        </li>
                        <li>
                            <label htmlFor="finishPoint">Enter finish point</label>
                            <select id="finishPoint" type="text">
                                {/* Placeholder */}
                                <option value="Queen St">Queen St</option>
                                <option value="Dufferin St">Dufferin St</option>
                                <option value="King St">King St</option>
                                <option value="College St">College St</option>
                                {/* Placeholder */}
                                {
                                    this.props.OnRender
                                }
                            </select>                            
                        </li>
                        <li>
                            <label htmlFor="checkPoint">Add checkpoint point</label>
                            <select id="checkPoint" type="text">
                                {/* Placeholder */}
                                <option value="Queen St">Queen St</option>
                                <option value="Dufferin St">Dufferin St</option>
                                <option value="King St">King St</option>
                                <option value="College St">College St</option>
                                {/* Placeholder */}
                                {
                                    this.props.OnRender
                                }
                            </select>                            
                        </li>
                    </ul>



                </form>
            </div>
            <div className="viewPoints">
                <h2>View race points</h2>
                <ul>
                    <li>Start</li>
                    <li>checkpoint 1
                        <span className="edit"><i class="far fa-edit"></i></span>
                        <span className="delete"><i class="far fa-trash-alt"></i></span>
                    </li>
                    <li>checkpoint 2
                        <span className="edit"><i class="far fa-edit"></i></span>
                        <span className="delete"><i class="far fa-trash-alt"></i></span>
                    </li>
                    <li>checkpoint 3
                        <span className="edit"><i class="far fa-edit"></i></span>
                        <span className="delete"><i class="far fa-trash-alt"></i></span>
                    </li>
                    <li>checkpoint 4
                        <span className="edit"><i class="far fa-edit"></i></span>
                        <span className="delete"><i class="far fa-trash-alt"></i></span>
                    </li>
                    <li>checkpoint 5
                        <span className="edit"><i class="far fa-edit"></i></span>
                        <span className="delete"><i class="far fa-trash-alt"></i></span>
                    </li>
                    <li>Finish</li>
                </ul>
            </div>
        </section>
      );
    }
  }

export default RacePoints;
