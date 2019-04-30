import React, { Component } from "react";
import Axios from "axios";

class AcceptRequest extends Component {
  handleConfirm = e => {
    var request = {
      userID: this.props.userID,
      friendID: this.props.friendID
    };
    console.log(request);
    Axios.put("/api/user/accept", request).then(res => {
      console.log("Accept response: ", res);
      this.props.reset();
      this.props.hide(e);
    });
  };

  // deletes friend ID from user's friend requests array
  // adds friend ID to user's friend array
  // adds user's ID to friend's friend array

  handleReject = e => {
    var request = {
      userID: this.props.userID,
      requestID: this.props.friendID
    };
    Axios.put("/api/user/reject", request).then(res => {
      console.log("Reject response: ", res);
      this.props.reset();
      this.props.hide(e);
    });
  };
  // deletes friend ID from user's requests array

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
              Would you like to accept the friend request from {this.props.name}
              ?
            </h3>
            <button className="button" onClick={this.props.hide}>
              Not Now
            </button>
            <button className="button is-danger" onClick={this.handleReject}>
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

export default AcceptRequest;
