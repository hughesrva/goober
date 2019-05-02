import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Axios from "axios";
import { Context } from "../App";

class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    userID: "",
    error: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCancelClick = () => {
    this.setState({
      email: "",
      password: ""
    });
    this.props.hide();
  };

  handleFormSubmit = event => {
    event.preventDefault();
    Axios.post("api/login", {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        if (res.data.success === true) {
          this.props.hide();
          const { token } = res.data;
          sessionStorage.setItem("jwtToken", token);
          this.setState({
            email: "",
            password: "",
            token: res.data.token,
            userID: res.data.userID
          });
          this.props.setUserInfo(this.state.token, this.state.userID);
        } else if (res.data.success === false) {
          console.log(res.data);
          this.setState({
            error: res.data.message
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Context.Consumer>
          {({ isUser }) =>
            isUser === true ? (
              <React.Fragment>
                <Redirect to="/profile" />
              </React.Fragment>
            ) : (
              <div>
                <div className={this.props.show ? "modal is-active" : "modal"}>
                  <div className="modal-background" onClick={this.props.hide} />
                  <div className="modal-content">
                    <div className="modal-card">
                      <div className="modal-card-head" />
                      <div className="modal-card-body">
                        <h1 className="title">Enter your login information.</h1>
                        <div className="field">
                          <label className="label">Email Address</label>
                          <div className="control">
                            <input
                              className="input"
                              type="emails"
                              placeholder="email@example.com"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Password</label>
                          <div className="control">
                            <input
                              className="input"
                              type="password"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <p className="has-text-danger">{this.state.error}</p>
                        <button
                          className="button confirmBtn is-large loginBtn"
                          onClick={this.handleFormSubmit}
                        >
                          Log In
                        </button>
                        <button
                          className="button is-danger is-large loginBtn"
                          onClick={this.handleCancelClick}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="modal-card-foot" />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </Context.Consumer>
      </div>
    );
  }
}

export default withRouter(LoginModal);
