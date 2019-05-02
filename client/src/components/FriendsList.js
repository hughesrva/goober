import React, { Component } from "react";
import Axios from "axios";
import AcceptRequest from "../components/AcceptRequest";
import { Context } from "../App";
import Chat from "../components/Chat";

class FriendsList extends Component {
  state = {
    friends: [],
    requests: [],
    requestModalShow: false,
    chatModalShow: false,
    friendName: "",
    friendID: "",
    messages: []
  };

  componentDidMount = () => {
    this.pullUserFriendData();
  };

  resetFriends = async () => {
    await this.setState({
      friends: [],
      requests: []
    });
    this.forceUpdate();
    this.pullUserFriendData();
  };

  // pulls friends and friend requests arrays from DB for current user
  pullUserFriendData = async () => {
    var rawFriends;
    var rawRequests;

    // pulls info for current user
    await Axios.get("/api/user/" + this.props.userID)
      .then(res => {
        console.log("Current user's data: ", res.data);
        // if user has friends, pushes to local friends array
        if (res.data.friends) {
          rawFriends = res.data.friends;
          console.log("Raw friends array: ", rawFriends);
        }
        // if user has requests, pushes to local requests array
        if (res.data.friend_requests) {
          rawRequests = res.data.friend_requests;
          console.log("Raw requests array: ", rawRequests);
        }
      })
      .catch(err => console.log(err));

    this.pullFriendListData(rawFriends);
    this.pullFriendRequestData(rawRequests);
  };

  // pulls details for each friend and then runs updateFriends to push each to `friends` state
  pullFriendListData = async array => {
    for (let item of array) {
      var friend = {
        name: "",
        location: "",
        dogs: [],
        id: item.id
      };
      await Axios.get("/api/user/" + item.id)
        .then(res => {
          friend.name = res.data.first_name + " " + res.data.last_name;
          friend.location = res.data.location;
        })
        .catch(err => console.log(err));
      await Axios.get("/api/dog/" + item.id).then(res => {
        console.log(res);
        for (let dog of res.data) {
          console.log(dog.name);
          friend.dogs.push(dog.name);
        }
      });
      console.log("Friend object: ", friend);
      this.updateFriends(friend);
    }
  };

  // pulls details for each person who sent a friend request and then runs updateRequests to push each person and message to the `requests` state
  pullFriendRequestData = async array => {
    for (let item of array) {
      var friendRequest = {
        name: "",
        location: "",
        dogs: [],
        id: item.id
      };
      await Axios.get("/api/user/" + item.id)
        .then(res => {
          friendRequest.name = res.data.first_name + " " + res.data.last_name;
          friendRequest.location = res.data.location;
        })
        .catch(err => console.log(err));
      await Axios.get("/api/dog/" + item.id).then(res => {
        console.log(res);
        for (let dog of res.data) {
          console.log(dog.name);
          friendRequest.dogs.push(dog.name);
        }
      });
      console.log("Friend request object: ", friendRequest);
      this.updateRequests(friendRequest);
    }
  };

  updateFriends = newItem => {
    var newArray = this.state.friends;
    newArray.push(newItem);
    this.setState({
      friends: newArray
    });
    console.log("Friends state: ");
  };

  updateRequests = newItem => {
    var newArray = this.state.requests;
    newArray.push(newItem);
    this.setState({
      requests: newArray
    });
    console.log("Requests state: ", this.state.requests);
  };

  hideRequestModal = e => {
    e.stopPropagation();
    this.setState({
      requestModalShow: false
    });
    console.log("clicked");
  };

  hideChatModal = e => {
    e.stopPropagation();
    this.setState({
      chatModalShow: false,
      messages: []
    });
    console.log("clicked");
  };

  updateParent = () => {
    this.forceUpdate();
  };
  showRequestModal = (name, id) => {
    this.setState({ requestModalShow: true, friendName: name, friendID: id });
  };

  showChatModal = async (name, id) => {
    await this.setState({
      chatModalShow: true,
      friendName: name,
      friendID: id,
      messages: []
    });
    if (this.state.friendID !== "") {
      const newMessages = [];
      await Axios.post("/api/chat/new", {
        userOne: this.props.userID,
        userTwo: this.state.friendID
      }).then(res => {
        console.log("Chat Response: ", res);
        if (res.data) {
          if (res.data.messages) {
            for (let message of res.data.messages) {
              var cleanMessage = {
                message: message.message,
                sender: message.sender
              };
              newMessages.push(cleanMessage);
            }
          }
        }
      });
      await this.setState({
        messages: newMessages
      });
    }
  };

  pullMessages = async (name, id) => {
    this.setState({
      messages: []
    });
    if (this.state.friendID !== "") {
      const newMessages = [];
      await Axios.post("/api/chat/new", {
        userOne: this.props.userID,
        userTwo: this.state.friendID
      }).then(res => {
        console.log("Chat Response: ", res);
        if (res.data) {
          if (res.data.messages) {
            for (let message of res.data.messages) {
              var cleanMessage = {
                message: message.message,
                sender: message.sender
              };
              newMessages.push(cleanMessage);
            }
          }
        }
      });
      await this.setState({
        messages: newMessages
      });
    }
  };

  render() {
    const friendItems = this.state.friends.map(item => (
      <div
        className="container has-text-centered friend-container"
        key={item.name}
        onClick={() => {
          this.showChatModal(item.name, item.id);
        }}
      >
        <div className="columns has-text-centered is-vcentered">
          <div className="column is-narrow">
            <img
              className="image dogProfilePic"
              src="https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif"
            />
          </div>
          <div className="column is-vcentered">
            <div className="content">
              <h3 className="subtitle">{item.name}</h3>
              <p>Lives in {item.location}</p>
            </div>
          </div>
          <div className="column is-vcentered">
            <h3 className="subtitle">
              <strong>Dogs</strong>
            </h3>
            <p>
              <strong>{item.dogs.join(", ")}</strong>
            </p>
          </div>
        </div>
      </div>
    ));

    const requestItems = this.state.requests.map(item => (
      <div
        className="container has-text-centered friend-container"
        key={item.name}
        onClick={() => {
          this.showRequestModal(item.name, item.id);
        }}
      >
        <div className="columns has-text-centered is-vcentered">
          <div className="column is-narrow">
            <img
              className="image dogProfilePic"
              src="https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif"
            />
          </div>
          <div className="column is-vcentered">
            <div className="content">
              <h3 className="subtitle">{item.name}</h3>
              <p>Lives in {item.location}</p>
            </div>
          </div>
          <div className="column is-vcentered">
            <h3 className="subtitle">
              <strong>Dogs</strong>
            </h3>
            <p>
              <strong>{item.dogs.join(", ")}</strong>
            </p>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="container has-text-centered">
        {this.state.friends.length === 0 ? (
          <h1 className="title">You haven't added any friends yet.</h1>
        ) : (
          <div>
            <div className="content">
              <h1 className="title">Friends List</h1>
            </div>
            {friendItems}
          </div>
        )}

        {this.state.requests.length === 0 ? (
          <div />
        ) : (
          <div>
            <div className="content">
              <h1 className="title">Requests List</h1>
            </div>
            {requestItems}
          </div>
        )}
        <Context.Consumer>
          {({ userID }) => (
            <AcceptRequest
              show={this.state.requestModalShow}
              hide={this.hideRequestModal}
              name={this.state.friendName}
              userID={userID}
              friendID={this.state.friendID}
              reset={this.resetFriends}
            />
          )}
        </Context.Consumer>
        <Context.Consumer>
          {({ userID, name }) => (
            <Chat
              show={this.state.chatModalShow}
              userID={userID}
              userName={name}
              friendID={this.state.friendID}
              friendName={this.state.friendName}
              hide={this.hideChatModal}
              messages={this.state.messages}
              pull={this.pullMessages}
            />
          )}
        </Context.Consumer>
      </div>
    );
  }
}

export default FriendsList;
