import React, { Component } from "react";

class SearchFormModal extends Component {
  state = {
    minWeight: 0,
    maxWeight: 100,
    energyOperator: "$gte",
    energyValue: 0,
    patienceOperator: "$gte",
    patienceValue: 0,
    dominanceOperator: "$gte",
    dominanceValue: 0,
    playfulnessOperator: "$gte",
    playfulnessValue: 0,
    results: []
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
    // this.props.resetResults();
    this.props.searchDogs(
      this.state.minWeight,
      this.state.maxWeight,
      this.state.energyOperator,
      this.state.energyValue,
      this.state.patienceOperator,
      this.state.patienceValue,
      this.state.dominanceOperator,
      this.state.dominanceValue,
      this.state.playfulnessOperator,
      this.state.playfulnessValue
    );
    this.props.hide();
    this.setState({
      modalShow: false,
      minWeight: 0,
      maxWeight: 100,
      energyOperator: "$gte",
      energyValue: 0,
      patienceOperator: "$gte",
      patienceValue: 0,
      dominanceOperator: "$gte",
      dominanceValue: 0,
      playfulnessOperator: "$gte",
      playfulnessValue: 0,
      results: []
    });
  };

  handleFormCancel = event => {
    event.preventDefault();
    this.props.hide();
    this.setState({
      modalShow: false,
      minWeight: 0,
      maxWeight: 100,
      energyOperator: "$gte",
      energyValue: 0,
      patienceOperator: "$gte",
      patienceValue: 0,
      dominanceOperator: "$gte",
      dominanceValue: 0,
      playfulnessOperator: "$gte",
      playfulnessValue: 0
    });
  };

  render() {
    return (
      <div>
        <div
          className={
            this.props.show === true
              ? "modal is-active modal-fx-fadeInScale"
              : "modal"
          }
        >
          <div className="modal-background" onClick={this.props.hide} />
          <div className="modal-card modal-content search-modal-content">
            <div className="modal-card-head">
              <p className="modal-card-title">
                Search for your dog's new friend!
              </p>
            </div>
            <div className="modal-card-body has-text-centered">
              {/* first row */}
              <div className="columns">
                {/* min weight */}
                <div className="column has-text-centered">
                  <div className="field">
                    <h3 className="subtitle">Minimum Weight</h3>
                    <div className="control">
                      <div>
                        <input
                          className="input"
                          type="number"
                          name="minWeight"
                          value={this.state.minWeight}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* max weight */}
                <div className="column has-text-centered">
                  <div className="field">
                    <h3 className="subtitle">Maximum Weight</h3>
                    <div className="control">
                      <div>
                        <input
                          className="input"
                          type="number"
                          name="maxWeight"
                          value={this.state.maxWeight}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              {/* second row */}
              <div className="columns has-text-centered">
                <div className="column has-text-centered">
                  <h3 className="subtitle">Energy Level</h3>
                  <div className="columns has-text-centered">
                    <div className="column has-text-centered">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.energyOperator}
                              name="energyOperator"
                              onChange={this.handleSelectChange}
                            >
                              <option value="$gte">At least</option>
                              <option value="$lt">Less than</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column has-text-centered">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.energyValue}
                              name="energyValue"
                              onChange={this.handleSelectChange}
                            >
                              <option value="1">1 (Less Energetic)</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6 (More Energetic)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column has-text-centered">
                  <h3 className="subtitle">Patience Level</h3>
                  <div className="columns has-text-centered">
                    <div className="column has-text-centered">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.patienceOperator}
                              name="patienceOperator"
                              onChange={this.handleSelectChange}
                            >
                              <option value="$gte">At least</option>
                              <option value="$lt">Less than</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column has-text-centered">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.patienceValue}
                              name="patienceValue"
                              onChange={this.handleSelectChange}
                            >
                              <option value="1">1 (Less Patient)</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6 (More Patient)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              {/* third row */}
              <div className="columns has-text-centered">
                <div className="column has-text-centered">
                  <h3 className="subtitle">Playfulness Level</h3>

                  <div className="columns has-text-centered">
                    <div className="column has-text-centered">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.playfulnessOperator}
                              name="playfulnessOperator"
                              onChange={this.handleSelectChange}
                            >
                              <option value="$gte">At least</option>
                              <option value="$lt">Less than</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column has-text-centered">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.playfulnessValue}
                              name="playfulnessValue"
                              onChange={this.handleSelectChange}
                            >
                              <option value="1">1 (Less Playful)</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6 (More Playful)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column has-text-centered">
                  <h3 className="subtitle">Dominance Level</h3>
                  <div className="columns has-text-centered">
                    <div className="column has-text-centered">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.dominanceOperator}
                              name="dominanceOperator"
                              onChange={this.handleSelectChange}
                            >
                              <option value="$gte">At least</option>
                              <option value="$lt">Less than</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column has-text-centered">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.dominanceValue}
                              name="dominanceValue"
                              onChange={this.handleSelectChange}
                            >
                              <option value="1">1 (Less Dominant)</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6 (More Dominant)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-card-foot">
              <button
                className="button confirmBtn"
                onClick={this.handleFormSubmit}
              >
                Search!
              </button>
              <button
                className="button is-danger"
                onClick={this.handleFormCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormModal;
