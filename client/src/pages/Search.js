import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Context } from "../App";
import SearchForm from "../components/SearchForm";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }
  hideModal = () => {
    this.setState({ modalShow: false });
  };
  showModal = () => {
    this.setState({ modalShow: true });
  };

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
                  <div className="container">
                    <div className="content has-text-centered">
                      <h1 className="title">Search for a new friend!</h1>
                    </div>
                  </div>
                  <SearchForm />
                </div>
              </div>
            )
          }
        </Context.Consumer>
      </div>
    );
  }
}

export default Search;
