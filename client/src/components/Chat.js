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

  handleClose = e => {
    this.setState({
      messages: []
    });
    this.props.hide(e);
  };

  render() {
    const messages = this.props.messages.map(message => (
      <div className="content" key={message.id}>
        <p
          className={
            message.sender === "sys"
              ? "sysMessage"
              : message.sender === this.props.userName
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
          <div className="modal-background" onClick={this.handleClose} />
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
                      pull={this.props.pull}
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
