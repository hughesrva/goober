import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Social from "./pages/Social";
import NoMatch from "./pages/NoMatch";
import NonUser from "./pages/NonUser";

export const Context = React.createContext({});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      isUser: false,
      userID: "",
      setUserInfo: this.setUserInfo,
      setName: this.setName,
      name: ""
    };
  }

  // why can't I change this state in the same place that I'm calling this function?
  setUserInfo = (token, userID) => {
    this.setState({
      token: token,
      isUser: true,
      userID: userID
    });
  };

  setName = name => {
    this.setState({
      name: name
    });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/social" component={Social} />
              <Route exact path="/nonuser" component={NonUser} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
export default App;
