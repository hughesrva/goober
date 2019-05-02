import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    showBurger: false
  };

  handleLogoutClick = () => {
    Axios.get("/api/logout");
  };

  toggleBurger = () => {
    this.state.showBurger === false
      ? this.setState({
          showBurger: true
        })
      : this.setState({
          showBurger: false
        });
  };

  closeBurger = () => {
    this.setState({
      showBurger: false
    });
  };

  render() {
    return (
      <nav className="navbar">
        <a
          role="button"
          class={
            this.state.showBurger === true
              ? "navbar-burger burger is-active"
              : "navbar-burger burger"
          }
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={this.toggleBurger}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
        <div
          className={
            this.state.showBurger === true
              ? "navbar-menu is-active"
              : "navbar-menu"
          }
        >
          {" "}
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
        </div>
      </nav>
    );
  }
}

export default Navbar;
