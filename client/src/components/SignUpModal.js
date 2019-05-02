import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Axios from "axios";
import { Context } from "../App";

class SignUpModal extends Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: "",
    firstName: "",
    lastName: "",
    location: "",
    token: "",
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
      password: "",
      confirmedPassword: "",
      firstName: "",
      lastName: "",
      location: "",
      image: "",
      error: ""
    });
    this.props.hide();
  };
  handleSignUpSubmit = event => {
    event.preventDefault();

    Axios.post("/api/register", {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.confirmedPassword,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      location: this.state.location,
      image: this.state.image
    })
      .then(res => {
        if (res.status === 200) {
          Axios.post("/api/login", {
            email: this.state.email,
            password: this.state.password
          }).then(res => {
            if (res.data.success === true) {
              this.props.hide();
              const { token } = res.data;
              sessionStorage.setItem("jwtToken", token);
              this.setState({
                email: "",
                password: "",
                confirmedPassword: "",
                firstName: "",
                lastName: "",
                location: "",
                token: res.data.token,
                userID: res.data.userID
              });
              this.props.setUserInfo(this.state.token, this.state.userID);
            } else if (res.data.success === false) {
              this.setState({
                error: "The information you entered is not valid."
              });
            }
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
              <div className={this.props.show ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={this.props.hide} />
                <div className="modal-content">
                  <div className="modal-card">
                    <div className="modal-card-head" />
                    <div className="modal-card-body">
                      <h1 className="title">
                        Enter your information to sign up.
                      </h1>
                      {/* email address field */}
                      <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                          <input
                            className="input"
                            type="email"
                            placeholder="email@example.com"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      {/* password field */}
                      <div className="field">
                        <label className="label">
                          Password (At least 6 characters)
                        </label>
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
                      {/* confirm password field */}
                      <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                          <input
                            className="input"
                            type="password"
                            name="confirmedPassword"
                            value={this.state.confirmedPassword}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      {/* first name field */}
                      <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      {/* last name field */}
                      <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      {/* location field */}
                      <div className="field">
                        <label className="label">Location</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Image URL</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="image"
                            value={this.state.image}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <p className="is-danger">{this.state.error}</p>
                      <button
                        className="button confirmBtn is-large loginBtn"
                        onClick={this.handleSignUpSubmit}
                      >
                        Submit
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
            )
          }
        </Context.Consumer>
      </div>
    );
  }
}

export default withRouter(SignUpModal);
