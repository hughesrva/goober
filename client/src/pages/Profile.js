import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Context } from "../App";
import ProfileInfo from "../components/ProfileInfo";
import DogProfileInfo from "../components/DogProfileInfo";

class Profile extends Component {
  render() {
    return (
      <div>
        <Context.Consumer>
          {({ isUser }) =>
            isUser !== true ? (
              <React.Fragment>
                <Redirect to="/nonuser" />;
              </React.Fragment>
            ) : (
              <div>
                <Navbar />
                <div className="section">
                  <div className="container" id="profileContainer">
                    <div className="content has-text-centered">
                      <h1 className="title">Your Profile</h1>
                    </div>
                  </div>
                  <Context.Consumer>
                    {({ userID, setName }) => (
                      <ProfileInfo userID={userID} setName={setName} />
                    )}
                  </Context.Consumer>
                  <Context.Consumer>
                    {({ userID }) => <DogProfileInfo userID={userID} />}
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

export default Profile;
