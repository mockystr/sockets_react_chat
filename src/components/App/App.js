import React, { Component, Fragment } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Home from 'containers/Home/Home';
import Chat from 'containers/Chat/Chat';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/chat' component={Chat} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
