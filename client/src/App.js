import React from 'react';

import { Switch, Route } from 'react-router-dom';

import UserProvider from './contexts/userProvider';
import HomePage from './page/home/HomePage';
import AboutPage from './page/about/AboutPage'
import Header from './components/header/Header';

import './App.scss';

const App= () => {
  return (
    <div>
    <UserProvider  >
      <Header />
    </UserProvider>
      <Switch>
        <UserProvider  >
          <Route exact path='/' component={HomePage} />
        </UserProvider>
        <Route path='/about' component={AboutPage} />
      </Switch>
    </div>
  );
}

export default App;
