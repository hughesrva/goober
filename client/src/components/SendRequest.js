import React, { Component } from "react";
import Axios from "axios";

class SendRequest extends Component {
  state = {
    message: ""
  };

  pushRequest = () => {
    var request = {
      id: this.props.userID,
      message: this.state.message
    };
    Axios.put("/api/user/request/" + this.props.friendID, request)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  hideModal = e => {
    this.props.hide(e);
  };

  handleConfirm = e => {
    this.pushRequest();
    this.hideModal(e);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div
        className={
          this.props.show ? "modal is-active modal-fx-fadeInScale" : "modal"
        }
      >
        <div className="modal-background" onClick={this.props.hide} />
        <div className="modal-card modal-content request-modal-content">
          <div className="modal-card-head" />
          <div className="modal-card-body">
            <h3 className="subtitle">
              Would you like to send a friend request to {this.props.name}?
            </h3>
            <p>Send a message with your request. (Optional)</p>
            <input
              className="input"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.handleInputChange}
            />
            <button className="button is-danger" onClick={this.props.hide}>
              No
            </button>
            <button className="button confirmBtn" onClick={this.handleConfirm}>
              Yes
            </button>
          </div>
          <div className="modal-card-foot" />
        </div>
      </div>
    );
  }
}

export default SendRequest;
