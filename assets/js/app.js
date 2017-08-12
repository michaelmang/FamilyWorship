import "phoenix_html";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import FamilyWorshipApp from './reducers/FamilyWorshipApp';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Dashboard from './containers/Dashboard';
import FamilySignup from './containers/FamilySignup';
import Session from './containers/Session';
import Home from './presentationals/Home';

//top level of React component hierarchy
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/signup" render={() => ( <Signup store = {store}/> )}/>
          <Route path="/login" render={() => ( <Signin store = {store}/> )}/>
          <Route path="/dashboard" render={() => ( <Dashboard store = {store}/> )}/>
          <Route path="/family-signup" render={() => ( <FamilySignup store = {store}/> )}/>
          <Route path="/session" render={() => ( <Session store = {store}/> )}/>
        </div>
      </Router>
    )
  }
}

//intialize store
let store = createStore(
  FamilyWorshipApp,
  applyMiddleware( logger )
);

ReactDOM.render(
  <Provider store = { store }>
    <App/>
  </Provider>,
  document.getElementById('app')
)
