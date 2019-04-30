import React, { Component } from "react";
import ChatForm from "../components/ChatForm";
import Axios from "axios";
import { Context } from "../App";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      userOne: "",
      userTwo: ""
    };
  }

  componentDidUpdate = async prevProps => {
    if (this.props !== prevProps) {
      if (this.state.userOne === "" || this.state.userTwo === "") {
        await this.setState({
          userOne: this.props.userID,
          userTwo: this.props.friendID
        });
        console.log("Friend: " + this.props.friendID);
        var request = {
          userOne: this.state.userOne,
          userTwo: this.state.userTwo
        };

        if (request.userOne !== "" && request.userTwo !== "") {
          const newMessages = [];

          await Axios.post("/api/chat/new", request).then(res => {
            console.log("New chat response ", res);
            if (res.data.messages) {
              for (let message of res.data.messages) {
                var cleanMessage = {
                  message: message.message,
                  sender: message.sender
                };
                newMessages.push(cleanMessage);
              }
            }
          });
          await this.setState({
            messages: newMessages
          });
          this.props.update();
        }
      }
    }
  };

  refresh = async () => {
    var request = {
      userOne: this.state.userOne,
      userTwo: this.state.userTwo
    };

    const newMessages = [];
    await Axios.post("/api/chat/new", request).then(res => {
      console.log("New chat response ", res);
      if (res.data.messages) {
        for (let message of res.data.messages) {
          var cleanMessage = {
            message: message.message,
            sender: message.sender
          };
          newMessages.push(cleanMessage);
        }
      }
    });
    await this.setState({
      messages: newMessages
    });
  };
  render() {
    const messages = this.state.messages.map(message => (
      <div className="content">
        <p
          className={
            message.sender === this.props.userName
              ? "userMessage"
              : "friendMessage"
          }
        >
          {message.message}
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
                  Your chat with <strong>{this.props.friendName}</strong>
                </h3>
              </div>
              <div className="modal-card-body">
                {messages}{" "}
                <Context.Consumer>
                  {({ userID }) => (
                    <ChatForm
                      userID={userID}
                      friendID={this.props.friendID}
                      userName={this.props.userName}
                      friendName={this.props.friendName}
                      update={this.props.update}
                      refresh={this.refresh}
                    />
                  )}
                </Context.Consumer>
              </div>
              <div className="modal-card-foot" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
