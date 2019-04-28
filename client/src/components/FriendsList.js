import React, { Component } from "react";
import Axios from "axios";

class FriendsList extends Component {
  state = {
    friends: [],
    requests: []
  };

  componentDidMount() {
    this.searchFriends();
  }
  async searchFriends() {
    var friendIDs = [];
    var requestIDs = [];

    // pulls info for current user
    await Axios.get("/api/user/" + this.props.userID)
      .then(res => {
        console.log(res.data);
        // if user has friends, pushes to local friends array
        if (res.data.friends) {
          friendIDs.push(res.data.friends);
        }
        // if user has requests, pushes to local requests array
        if (res.data.friends) {
          requestIDs.push(res.data.requests);
        }
      })
      .catch(err => console.log(err));

    //   loops through local friends array and calls for each friend's information
    for (let id of friendIDs) {
      Axios.get("/api/user/" + id)
        .then(res => {
          if (res) {
            console.log("Friend: " + res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    // loops through local requests array and calls for each request's information
    for (let id of requestIDs) {
      Axios.get("/api/user/" + id)
        .then(res => {
          console.log("Request: " + res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  updateFriends(newItem) {
    var newArray = this.state.friends;
    newArray.push(newItem);
    this.setState({
      friends: newArray
    });
  }

  updateRequests(newItem) {
    var newArray = this.state.friends;
    newArray.push(newItem);
    this.setState({
      requests: newArray
    });
  }

  render() {
    const friends = this.state.friends.map(friend => (
      <div className="columns">
        <div className="column is-narrow has-text-centered">
          <img className="image" src="https://via.placeholder.com/150" />
        </div>
        <div classname="column is-vcentered">
          <h3 className="subtitle">
            {friend.first_name} {friend.last_name}
          </h3>
        </div>
      </div>
    ));

    const requests = this.state.requests.map(request => (
      <div className="columns">
        <div className="column is-narrow has-text-centered">
          <img className="image" src="https://via.placeholder.com/150" />
        </div>
        <div classname="column is-vcentered">
          <h3 className="subtitle">
            {request.first_name} {request.last_name}
          </h3>
        </div>
      </div>
    ));
    return (
      <div className="container">
        {this.state.friends.length === 0 ? (
          <h3 className="subtitle">You haven't added any friends yet.</h3>
        ) : (
          <div>
            <div className="content">
              <h1 className="title">Friends List</h1>
            </div>
            {friends}
            <div className="content">
              <h1 className="title">Requests List</h1>
            </div>
            {requests}
          </div>
        )}
      </div>
    );
  }
}

export default FriendsList;
