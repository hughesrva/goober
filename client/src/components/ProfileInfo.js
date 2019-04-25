import React, { Component } from "react";
import Axios from "axios";

class ProfileInfo extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    location: ""
  };

  componentDidMount = () => {
    if (this.props.userID !== "") {
      Axios.get("/api/user/" + this.props.userID).then(res => {
        this.setState({
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email,
          location: res.data.location
        });
      });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleUpdateClick = event => {
    event.preventDefault();
    Axios.post("api/user/update" + this.props.userID, {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      location: this.state.location
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div className="container" id="owner-container">
          <div className="columns">
            <div className="column is-narrow column-left">
              <img className="image" src="https://via.placeholder.com/150" />
            </div>
            <div className="column column-right">
              <form>
                <div className="field">
                  <label className="label">Your First Name</label>
                  <input
                    className="input"
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Your Last Name</label>
                  <input
                    className="input"
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Your Email Address</label>
                  <input
                    className="input"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Your Location</label>
                  <input
                    className="input"
                    type="text"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="field">
                  <button className="button" onCLick={this.handleUpdateClick}>
                    Save Personal Information
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileInfo;
