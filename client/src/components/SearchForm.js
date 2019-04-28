import React, { Component } from "react";
import Axios from "axios";
import SearchFormModal from "../components/SearchFormModal";
import SearchResults from "../components/SearchResults";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      results: []
    };
  }

  //   function to run and handle results of dog search call
  searchDogs = (
    minWeight,
    maxWeight,
    energyOperator,
    energyValue,
    patienceOperator,
    patienceValue,
    dominanceOperator,
    dominanceValue,
    playfulnessOperator,
    playfulnessValue
  ) => {
    Axios.get("/api/search", {
      params: {
        minWeight: minWeight,
        maxWeight: maxWeight,
        energyOperator: energyOperator,
        energyValue: energyValue,
        patienceOperator: patienceOperator,
        patienceValue: patienceValue,
        dominanceOperator: dominanceOperator,
        dominanceValue: dominanceValue,
        playfulnessOperator: playfulnessOperator,
        playfulnessValue: playfulnessValue
      }
    })
      .then(res => {
        this.setState({
          results: res.data
        });
      })
      .catch(err => console.log(err));
  };

  hideModal = () => {
    this.setState({ modalShow: false });
  };
  showModal = () => {
    this.setState({ modalShow: true });
  };

  render() {
    return this.state.results.length !== 0 ? (
      <div>
        <div className="container">
          <div className="content has-text-centered">
            <button
              className="button confirmBtn is-large"
              onClick={this.showModal}
            >
              Search
            </button>
            <SearchResults results={this.state.results} />
          </div>

          <SearchFormModal
            hide={this.hideModal}
            show={this.state.modalShow}
            searchDogs={this.searchDogs}
          />
        </div>
      </div>
    ) : (
      <div>
        <div className="container">
          <div className="content has-text-centered">
            <button
              className="button confirmBtn is-large"
              onClick={this.showModal}
            >
              Search
            </button>
            <SearchResults results={this.state.results} />
          </div>

          <SearchFormModal
            hide={this.hideModal}
            show={this.state.modalShow}
            searchDogs={this.searchDogs}
          />
        </div>
      </div>
    );
  }
}
export default SearchForm;
