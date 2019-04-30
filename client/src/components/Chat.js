import React, { Component } from "react";
import ChatForm from "../components/ChatForm";
import Axios from "axios";
import { Context } from "../App";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidUpdate = () => {
    this.startChat();
  };

  startChat = async () => {
    console.log("Friend: " + this.props.friendID);
    var request = {
      userOne: this.props.userID,
      userTwo: this.props.friendID
    };

    if (request.userOne !== "" && request.userTwo !== "") {
      await Axios.post("/api/chat/new", request).then(res => {
        console.log("New chat response ", res);
        if (res.data.messages) {
          for (let message of res.data.messages) {
            var cleanMessage = {
              message: message.message,
              sender: message.sender
            };
            this.updateArray(cleanMessage);
          }
        }
      });
    }
  };

  updateArray = async message => {
    await this.setState(prevState => {
      messages: prevState.messages.push(message);
    });
  };

  render() {
    const messages = this.state.messages.map(message => (
      <div className="content">
        <p>
          <span
            className={
              message.sender === this.props.name
                ? "userMessage"
                : "friendMessage"
            }
          >
            {message.sender}
          </span>
          : {message.message}
        </p>
      </div>
    ));
    return (
      <div>
        <div className={this.props.show ? "modal is-active" : "modal"}>
          <div className="modal-background" onClick={this.props.hide} />
          <div className="modal-content">
            <div className="modal-card">
              <div className="modal-card-head">
                <h3 className="subtitle">
                  Your chat with {this.props.friendName}
                </h3>
              </div>
              <div className="modal-card-body">{messages} </div>
              <div className="modal-card-foot">
                <Context.Consumer>
                  {({ userID }) => (
                    <ChatForm
                      userID={userID}
                      friendID={this.props.friendID}
                      userName={this.props.userName}
                      friendName={this.props.friendName}
                    />
                  )}
                </Context.Consumer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
