import React, { Component } from "react";
import Axios from "axios";

class NewDogForm extends Component {
  state = {
    name: "",
    gender: "",
    weight: 0,
    energy: 0,
    patience: 0,
    dominance: 0,
    playfulness: 0,
    image: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSelectChange = event => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    var image = "";
    {
      this.state.image !== ""
        ? (image = this.state.image)
        : (image =
            "http://www.stickpng.com/assets/images/5845e608fb0b0755fa99d7e7.png");
    }
    Axios.post("api/dog", {
      name: this.state.name,
      gender: this.state.gender,
      weight: this.state.weight,
      energy: this.state.energy,
      patience: this.state.patience,
      dominance: this.state.dominance,
      playfulness: this.state.playfulness,
      ownerID: this.props.userID,
      image: image
    })
      .then(res => {
        console.log("Response from new dog API: ", res);
        if (res.status === 200) {
          this.props.hide();
          this.setState({
            name: "",
            gender: "",
            weight: 0,
            energy: 0,
            patience: 0,
            dominance: 0,
            playfulness: 0,
            image: ""
          });
          this.props.loadDogs();
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className={this.props.show ? "modal is-active" : "modal"}>
          <div className="modal-background" onClick={this.props.hide} />
          <div className="modal-content">
            <div className="modal-card">
              <div className="modal-card-head" />
              <div className="modal-card-body">
                <h1 className="title">Enter your dog's information.</h1>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Gender</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={this.state.gender}
                        name="gender"
                        onChange={this.handleSelectChange}
                        required
                      >
                        <option value="">Select One</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Weight</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="weight"
                      value={this.state.weight}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">How energetic is your dog?</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={this.state.energy}
                        name="energy"
                        onChange={this.handleSelectChange}
                        required
                      >
                        <option value="">Select One</option>
                        <option value="1">1 (Not at all)</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6 (Very energetic)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">How patient is your dog?</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={this.state.patience}
                        name="patience"
                        onChange={this.handleSelectChange}
                        required
                      >
                        <option value="">Select One</option>
                        <option value="1">1 (Not at all)</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6 (Very patient)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">How dominant is your dog?</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={this.state.dominance}
                        name="dominance"
                        onChange={this.handleSelectChange}
                        required
                      >
                        <option value="">Select One</option>
                        <option value="1">1 (Not at all)</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6 (Very dominant)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">How playful is your dog?</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={this.state.playfulness}
                        name="playfulness"
                        onChange={this.handleSelectChange}
                        required
                      >
                        <option value="">Select One</option>
                        <option value="1">1 (Not at all)</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6 (Very playful)</option>
                      </select>
                    </div>
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
                <button
                  className="button confirmBtn"
                  onClick={this.handleFormSubmit}
                >
                  Add Dog
                </button>
              </div>
              <div className="modal-card-foot" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewDogForm;
