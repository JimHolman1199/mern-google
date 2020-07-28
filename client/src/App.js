import React from 'react';

import { Switch, Route } from 'react-router-dom';

import UserProvider from './contexts/userProvider';
import HomePage from './page/home/HomePage';
import AboutPage from './page/about/AboutPage'
import Header from './components/header/Header';
import BackPhoto from './assets/viking.png';
import bagroundAshes from './assets/ashes.png';
import fireImage from './assets/FlatFancyBufflehead-size_restricted.gif'
import './App.scss';


const App= ({user}) => {
  return (
    <div style={{backgroundImage:`url(${BackPhoto}), url(${fireImage})`,height:'100vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
    <UserProvider  >
      <Header />
    </UserProvider>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/about' component={AboutPage} />
      </Switch>
    </div>
  );
}

export default App;
