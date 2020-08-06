import React from "react";

import { Switch, Route } from "react-router-dom";

import HomePage from "./page/home/HomePage";
import AboutPage from "./page/about/AboutPage";
import Header from "./components/header/Header";
import CurrentUserContext from "./contexts/current-user/current-user.context";

import "./App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    fetch("/auth/user")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          currentUser: res
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const changeUserState = () => {
      this.setState({
        currentUser: null
      })
    }

    return (
      <div>
        <CurrentUserContext.Provider 
          value={{
            currentUser:this.state.currentUser,
            changeUserState: changeUserState
          }}>
          <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <CurrentUserContext.Provider value={this.state.currentUser}>
            <Route exact path="/" component={HomePage} />
          </CurrentUserContext.Provider>
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
