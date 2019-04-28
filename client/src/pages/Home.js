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
            <div className="section" id="homeSection">
              <section className="hero is-large has-bg-img">
                <div className="hero-body ">
                  <div className="container has-text-centered">
                    <h1 className="title" id="siteTitle">
                      Goober
                    </h1>
                    <h2 className="subtitle" id="siteSubtitle">
                      Helping you find man's best friend's second best friend.
                    </h2>

                    <div className="columns">
                      <div className="column is-one-quarter" />
                      <div className="column is-one-quarter">
                        <button
                          className="button is-large"
                          id="loginButton"
                          onClick={this.showLogin}
                        >
                          Login
                        </button>
                      </div>
                      <div className="column is-one-quarter">
                        <button
                          className="button is-large"
                          id="signUpButton"
                          onClick={this.showSignUp}
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className="column is-one-quarter" />
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
                  </div>
                </div>
              </section>
            </div>
          )}
        </Context.Consumer>
      </div>
    );
  }
}

export default Home;
