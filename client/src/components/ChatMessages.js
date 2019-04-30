import React, { Component } from "react";

class ChatMessages extends Component {
  state = {
    messages: []
  };
  componentDidMount = () => {
    this.setState({
      messages: this.props.messages
    });
  };
  render() {
    var messages;
    if (this.state.messages.length !== 0) {
      messages = this.state.messages.map(message => (
        <p
          className={
            message.sender === this.props.name ? "userMessage" : "friendMessage"
          }
        >
          {message.message}
        </p>
      ));
    } else {
      messages = <div />;
    }
    return { messages };
  }
}

export default ChatMessages;
