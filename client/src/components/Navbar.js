import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

class Navbar extends Component {
  handleLogoutClick = () => {
    Axios.get("/api/logout");
  };

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link to="/profile">
            <button type="button" className="navbar-item button">
              Profile
            </button>
          </Link>
          <Link to="/search">
            <button type="button" className="navbar-item button">
              Search
            </button>
          </Link>
          <Link to="/social">
            <button type="button" className="navbar-item button">
              Social
            </button>
          </Link>
        </div>
        <div className="navbar-end">
          <a href="/">
            <button
              type="button"
              className="navbar-item button"
              onClick={this.handleLogoutClick}
            >
              Log Out
            </button>
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
