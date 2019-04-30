import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Context } from "../App";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";

class Social extends Component {
  render() {
    return (
      <div>
        <Context.Consumer>
          {({ isUser }) =>
            isUser !== true ? (
              <React.Fragment>
                <Redirect to="/nonuser" />
              </React.Fragment>
            ) : (
              <div>
                <Navbar />
                <div className="section">
                  <div className="container">
                    <div className="content has-text-centered">
                      <h1 className="title">Social Page</h1>
                    </div>
                  </div>
                  <Context.Consumer>
                    {({ userID }) => (
                      <FriendsList
                        setSelectedFriend={this.setSelectedFriend}
                        userID={userID}
                      />
                    )}
                  </Context.Consumer>
                </div>
              </div>
            )
          }
        </Context.Consumer>
      </div>
    );
  }
}

export default Social;
