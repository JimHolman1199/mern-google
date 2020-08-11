import React from "react";

import { Switch, Route } from "react-router-dom";

import HomePage from "./page/home/HomePage";
import AboutPage from "./page/about/AboutPage";
import Header from "./components/header/Header";
import UserProvider from "./providers/user/UserProvider";
import TableProvider from "./providers/data/DataProvider";

import "./App.scss";

const App = () => (
    <UserProvider>
      <TableProvider>
        <Header />
        <Switch>
          <Route path="/about" component={AboutPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </TableProvider>
    </UserProvider>
);

export default App;
