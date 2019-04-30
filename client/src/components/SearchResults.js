import React, { Component } from "react";
import Axios from "axios";
import SendRequest from "../components/SendRequest";
import { Context } from "../App";

class SearchResults extends Component {
  state = {
    dogs: [],
    loading: false,
    noAction: true,
    requestModalShow: false,
    friendName: "",
    friendID: ""
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.results !== this.props.results) {
      console.log("this page breaks if this isn't here. don't mind me.");
      for (let localResult of this.props.results) {
        console.log("test");
        var dog = {
          name: localResult.name,
          gender: localResult.gender,
          weight: localResult.weight,
          energy: localResult.energy,
          patience: localResult.patience,
          dominance: localResult.dominance,
          playfulness: localResult.playfulness,
          ownerName: "",
          ownerLocation: "",
          siblings: false,
          ownerID: localResult.ownerID
        };
        await this.loadOwners(dog);
        this.updateArray(dog);
      }
    }
  };

  loadOwners = dog => {
    this.setState({
      loading: true,
      noAction: false
    });
    if (dog.ownerID !== "") {
      Axios.get("/api/user/" + dog.ownerID).then(res => {
        dog.ownerName = res.data.first_name + " " + res.data.last_name;
        dog.ownerLocation = res.data.location;
        if (res.data.dogs.length > 1) {
          dog.siblings = true;
        }
      });
    }
  };

  updateArray = dog => {
    var newArray = this.state.dogs;
    newArray.push(dog);
    this.setState({
      dogs: newArray,
      loading: false
    });
    console.log(this.state.dogs);
  };

  hideRequestModal = e => {
    e.stopPropagation();
    this.setState({
      requestModalShow: false
    });
    console.log("clicked");
  };

  showRequestModal = (name, id) => {
    this.setState({ requestModalShow: true, friendName: name, friendID: id });
  };

  render() {
    const resultsList = this.state.dogs.map(dog => (
      <div>
        <Context.Consumer>
          {({ userID }) => (
            <div
              className="columns is-vcentered search-result-container"
              key={dog._id}
              onClick={() => {
                this.showRequestModal(dog.ownerName, dog.ownerID);
              }}
            >
              <div className="column is-narrow ">
                <div className="content">
                  <h3 className="subtitle">{dog.name}</h3>
                </div>
                <figure className="image">
                  <img src="https://via.placeholder.com/150" />
                </figure>
              </div>
              {/* left column */}
              <div className="column is-vcentered">
                <div className="content">
                  <p>{dog.gender}</p>
                  <p>{dog.weight} pounds</p>
                  <p>{dog.ownerLocation}</p>
                </div>
              </div>
              {/* middle column */}
              <div className="column">
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
              <div className="column has-text-centered is-narrow">
                <div className="content">
                  <p>Owner: {dog.ownerName}</p>
                </div>
                <figure className="image">
                  <img src="https://via.placeholder.com/150" />
                </figure>
              </div>
              <SendRequest
                hide={this.hideRequestModal}
                show={this.state.requestModalShow}
                friendID={this.state.friendID}
                userID={userID}
                name={this.state.friendName}
              />
            </div>
          )}
        </Context.Consumer>
      </div>
    ));

    return (
      <div>
        {this.state.loading === true ? (
          <h3 className="subtitle">Loading...</h3>
        ) : (
          <div>
            {this.state.noAction === true ? (
              <h3 className="subtitle">
                Click the button to search your dog's next best friend!
              </h3>
            ) : (
              <div className="container">
                {this.state.dogs.length !== 0 ? (
                  <div>{resultsList}</div>
                ) : (
                  <div className="content">
                    <h3 className="subtitle">No matches found :(</h3>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchResults;
