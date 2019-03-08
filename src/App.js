import React, { Component } from 'react';
import firebase from './firebase.js';
import RacePoints from './RacePoints.js';
import NameDesc from './NameDesc.js';
import Result from './Result.js';
import PrevRaces from './PrevRaces.js';
import './styles/Setup.css';
import './styles/Header.css';
import scrollToComponent from 'react-scroll-to-component';
import swal from '@sweetalert/with-react';
import UserPrevRace from './UserPrevRace.js';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      stations: [],
      name: '',
      description: "",
      race: {
        startPoint: '',
        endPoint: '',
        selectedCheckpoint: [],
        raceArray: []
      },
      view: true,
      user: null,
      authID: ''
    }
  }

  //updatestate from user input
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

  //update state from user select
  handleStartChange = (event) => {
    this.setState({
      race:
      {
        ...this.state.race,
        startPoint: event.label
      }
    });
  }


  handleEndChange = (event) => {
    this.setState({
      race:
      {
        ...this.state.race,
        endPoint: event.label
      }
    });
  }

  handleCheckPointChange = (event) => {
    this.setState({
      race:
      {
        ...this.state.race,
        selectedCheckpoint: event.label
      }
    });
  }

  addCheckPoint = (event) => {
    event.preventDefault();
    let changeArray = this.state.race.raceArray;
    changeArray.push(this.state.race.selectedCheckpoint);
    this.setState({
      race:
      {
        ...this.state.race,
        raceArray: changeArray
      }
    });
  }

  deleteCheckpoint = (index) => {
    swal({
      title: "Are you sure?",
      text: `Do you want to delete the ${this.state.race.raceArray[index]} checkpoint`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let changeArray = this.state.race.raceArray;
        changeArray.splice(index, 1);
        this.setState({
          race:
          {
            ...this.state.race,
            raceArray: changeArray
          }
        });
      } else {
        swal("Your checkpoint is safe!");
      }
    });
  }

  // handel save button clicked

  handleSaveRace = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();
    const savedRace = {
      name: this.state.name,
      description: this.state.description,
      startPoint: this.state.race.startPoint,
      endPoint: this.state.race.endPoint,
      selectedCheckpoint: this.state.race.raceArray
    }

    if (savedRace.name && savedRace.description && savedRace.startPoint && savedRace.endPoint) {
      dbRef.push(savedRace);
      this.setState({
        name: '',
        description: "",
        race: {
          startPoint: '',
          endPoint: '',
          selectedCheckpoint: [],
          raceArray: []
        }
      })
    } else {
      swal('Please make sure you have entered a race name and description, and have selected a station for your "start" and "finish" locations.')
    }

  }

  // handle authorize user previous race
    handleAuthPrevRace = (event) => {
      event.preventDefault();
      const authID = this.state.authID
      const dbRef = firebase.database().ref(`authUsers/${authID}`);
      const savedRace = {
        name: this.state.name,
        description: this.state.description,
        startPoint: this.state.race.startPoint,
        endPoint: this.state.race.endPoint,
        selectedCheckpoint: this.state.race.raceArray
      }

      if (savedRace.name && savedRace.description && savedRace.startPoint && savedRace.endPoint) {
        dbRef.push(savedRace);
        this.setState({
          name: '',
          description: "",
          race: {
            startPoint: '',
            endPoint: '',
            selectedCheckpoint: [],
            raceArray: []
          }
        })
      } else {
        swal('Please make sure you have entered a race name and description, and have selected a station for your "start" and "finish" locations.')
      }

    }



  // handle previous button clicked
  handlePrevRace = (event) => {
    event.preventDefault();
    this.setState({
      view: null
    })
  }

  // handle home button clicked
  handleHome = (event) => {
    event.preventDefault();
    this.setState({
      view: true
    })
  }

  //smooth scroll
  scrollND = () => {
    scrollToComponent(this.NameDesc)
  }
  scrollRP = () => {
    scrollToComponent(this.RacePoints)
  }
  scrollRes = () => {
    scrollToComponent(this.Result)
  }

  //user authentication
  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(user.uid)
        const userID = user.uid
        this.setState({
          user : true,
          authID : userID
        });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    if (this.state.view) {
      return (
        <div className="App">
          <header className="headerContent">
            <nav className="clearfix">
              <ul>
                <li className="home"><a href="#">Home</a></li>
                <li className="prevRaces" onClick={this.handlePrevRace}><a href="#">Previous Races</a></li>
              </ul>
            </nav>
            <h1>Welcome to Toronto Bike Share Races</h1>
            <button onClick={this.scrollND}>Create Race</button>
            {
              this.state.user ? 
            <button onClick={this.logout}>Log Out</button> 
            : <button onClick={this.login}>Login</button>
            }
          </header>
  
          <NameDesc 
          takeName={this.upDateName} 
          takeDesc={this.upDateDesc}
          
          name={this.state.name}
          description={this.state.description} 
          ref={(component) => { this.NameDesc = component; }}
          scrollRacePoints={this.scrollRP}
          handlePrev={this.handlePrevRace}
          />

          <RacePoints
            handleOptionChange={this.handleOptionChange}
            handleUserStart={this.handleStartChange}
            handleUserEnd={this.handleEndChange}
            handleUserCheckPoint={this.handleCheckPointChange}
            handlePrev={this.handlePrevRace}

            handleAddCheckPoint={this.addCheckPoint}
            handleDeleteCheckpoint={this.deleteCheckpoint}

            userStart={this.state.race.startPoint}
            userEnd={this.state.race.endPoint}
            userCheckPoint={this.state.race.selectedCheckpoint}
            raceArray={this.state.race.raceArray}

            scrollResults={this.scrollRes}
            ref={(component) => { this.RacePoints = component; }}
          />

          <Result
            name={this.state.name}
            description={this.state.description}
            startP={this.state.race.startPoint}
            endP={this.state.race.endPoint}
            checkP={this.state.race.raceArray}
            user={this.state.user}
            handleSave={this.handleSaveRace}
            handleUserSave={this.handleAuthPrevRace}
            handlePrev={this.handlePrevRace}
            

            ref={(component) => { this.Result = component; }}
          />
        </div>
      );
    } else {
      if (this.state.user) {
        return <UserPrevRace 
                authID = {this.state.authID}
                handleBack={this.handleHome}
                />
      } else {
        return <PrevRaces handleBack={this.handleHome} />
      }
    }
  }
}

export default App;
