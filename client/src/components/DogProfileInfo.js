import React, { Component } from "react";
import Axios from "axios";
import { Context } from "../App";
import NewDogForm from "../components/NewDogForm";

class DogProfileInfo extends Component {
  state = {
    newDogFormShow: false,
    dogs: []
  };

  componentDidMount() {
    if (this.props.userID !== "") {
      this.loadDogs();
    }
  }

  loadDogs = () => {
    Axios.get("/api/dog/" + this.props.userID)
      .then(res => {
        console.log(res.data);
        this.setState({
          dogs: res.data
        });
      })
      .catch(err => console.log(err));
  };

  handleDeleteClick = dogID => {
    Axios.delete("/api/dog/" + dogID)
      .then(res => this.loadDogs())
      .catch(err => console.log(err));
  };

  showNewDogForm = () => {
    this.setState({
      newDogFormShow: true
    });
  };

  hideModal = () => {
    this.setState({
      newDogFormShow: false
    });
  };

  render() {
    const dogs = this.state.dogs.map(dog => (
      <div
        className="container has-text-centered dog-profile-container"
        key={dog._id}
      >
        <div className="columns has-text-centered is-vcentered">
          <div className="column is-narrow is-vcentered">
            <img className="image" src="https://via.placeholder.com/150" />

            <button
              onClick={() => this.handleDeleteClick(dog._id)}
              className="button caution-button"
            >
              Delete
            </button>
          </div>
          {/* left column */}
          <div className="column is-vcentered">
            <div className="content is-vcentered">
              <h3 className="subtitle">{dog.name}</h3>
              <p>
                {dog.name}'s gender: {dog.gender}
              </p>
              <p>
                {dog.name}'s weight: {dog.weight}
              </p>
            </div>
          </div>
          {/* right column */}
          <div className="column is-vcentered">
            <div className="content">
              <p>
                {dog.name}'s energy level: {dog.energy}
              </p>
              <p>
                {dog.name}'s patience level: {dog.patience}
              </p>
              <p>
                {dog.name}'s dominance level: {dog.dominance}
              </p>
              <p>
                {dog.name}'s playfulness level: {dog.playfulness}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <React.Fragment>
        <div className="container has-text-centered" id="dog-container">
          {this.state.dogs.length !== 0 ? (
            <div className="container">
              <button
                className="button is-large confirmBtn"
                onClick={this.showNewDogForm}
              >
                Add a Dog
              </button>
              <Context.Consumer>
                {({ userID }) => (
                  <NewDogForm
                    show={this.state.newDogFormShow}
                    hide={this.hideModal}
                    userID={userID}
                    loadDogs={this.loadDogs}
                  />
                )}
              </Context.Consumer>
              {dogs}
            </div>
          ) : (
            <div>
              <div className="content has-text-centered">
                <br />
                <h3 className="subtitle">You haven't added any dogs yet!</h3>
                <h3 className="subtitle">Click the button to add one.</h3>
                <button
                  className="button is-large confirmBtn"
                  onClick={this.showNewDogForm}
                >
                  Add a Dog
                </button>
              </div>

              <Context.Consumer>
                {({ userID }) => (
                  <NewDogForm
                    show={this.state.newDogFormShow}
                    hide={this.hideModal}
                    userID={userID}
                    loadDogs={this.loadDogs}
                  />
                )}
              </Context.Consumer>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default DogProfileInfo;
