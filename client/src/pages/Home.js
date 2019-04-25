import React, { Component } from "react";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import { Context } from "../App";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginShow: false,
      signUpShow: false
    };
  }

  hideModal = () => {
    this.setState({ loginShow: false });
    this.setState({ signUpShow: false });
  };
  showLogin = () => {
    this.setState({ loginShow: true });
  };
  showSignUp = () => {
    this.setState({ signUpShow: true });
  };

  render() {
    return (
      <div>
        <Context.Consumer>
          {({ setUserInfo }) => (
            <div className="section">
              <div className="container">
                <div className="content">
                  <h1 className="title">Goober</h1>
                  <h3 className="subtitle">
                    Helping you find man's best friend's best friend.
                  </h3>
                </div>
                <LoginModal
                  show={this.state.loginShow}
                  hide={this.hideModal}
                  setUserInfo={setUserInfo}
                />
                <SignUpModal
                  show={this.state.signUpShow}
                  hide={this.hideModal}
                  setUserInfo={setUserInfo}
                />
                <button className="button" onClick={this.showLogin}>
                  Login
                </button>
                <button className="button" onClick={this.showSignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </Context.Consumer>
      </div>
    );
  }
}

export default Home;
