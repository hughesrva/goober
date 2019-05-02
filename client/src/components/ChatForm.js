import React, { Component } from "react";
import Axios from "axios";

class ChatForm extends Component {
  state = {
    message: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  sendMessage = async () => {
    var request = {
      userOne: this.props.userID,
      userTwo: this.props.friendID,
      userName: this.props.userName,
      message: this.state.message
    };
    console.log("Message request: ", request);
    await Axios.post("/api/chat/send", request).then(res => console.log(res));
    this.setState({
      message: []
    });
    this.props.pull();
  };

  render() {
    return (
      <div>
        <div className="control">
          <input
            className="input"
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="control">
          <button
            className="button is-pulled-right confirmBtn"
            onClick={this.sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default ChatForm;
