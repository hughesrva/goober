import React, { Component } from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

class Navbar extends Component {
  handleLogoutClick = () => {
    Axios.get("/api/logout");
  };

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link to="/profile">
            <button type="button" className="navbar-item">Profile</button>
          </Link>
          <Link to="/search">
            <button type="button" className="navbar-item">Search</button>
          </Link>
          <Link to="/social">
            <button type="button" className="navbar-item">Social</button>
          </Link>
        </div>
        <div className="navbar-end">
          <a className="navbar-item" href="/" onClick={this.handleLogoutClick}>
            Log Out
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
