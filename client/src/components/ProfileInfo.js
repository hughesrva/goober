import React, { Component } from "react";
import Axios from "axios";

class ProfileInfo extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    image: "",
    newImage: ""
  };

  componentDidMount = () => {
    if (this.props.userID !== "") {
      Axios.get("/api/user/" + this.props.userID).then(res => {
        this.setState({
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email,
          location: res.data.location,
          image: res.data.image
        });
        var fullName = res.data.first_name + " " + res.data.last_name;
        this.props.setName(fullName);
      });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleUpdateClick = async event => {
    event.preventDefault();
    let updatedUser = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      location: this.state.location,
      image: this.state.newImage
    };

    await Axios.put("api/user/update/" + this.props.userID, updatedUser)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({
      newImage: ""
    });
    this.forceUpdate();
  };

  render() {
    return (
      <React.Fragment>
        <div className="container has-text-centered" id="owner-container">
          <div className="columns has-text-centered is-vcentered">
            <div className="column has-text-centered is-one-quarter column-left is-vcentered">
              <figure className="image profilePic">
                <img
                  src={
                    this.state.image !== ""
                      ? this.state.image
                      : "https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif"
                  }
                />
              </figure>
            </div>
            <div className="column is-three-quarters column-right">
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
                  <label className="label">New Image URL</label>
                  <input
                    className="input"
                    type="text"
                    name="newImage"
                    value={this.state.newImage}
                    onChange={this.handleInputChange}
                  />
                </div>
              </form>
            </div>
          </div>
          <button
            className="button confirmBtn"
            onClick={this.handleUpdateClick}
          >
            Save Personal Information
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileInfo;
