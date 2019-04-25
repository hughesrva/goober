import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Context } from "../App";

class Social extends Component {
  render() {
    return (
      <div>
        <Context.Consumer>
          {({ isUser }) =>
            isUser !== true ? (
              <React.Fragment>
                <Redirect to="/nonuser" />
              </React.Fragment>
            ) : (
              <div>
                <Navbar />
                <div className="section">
                  <div className="container">
                    <div className="content">
                      <h1 className="title">Social Page</h1>
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

export default Social;
