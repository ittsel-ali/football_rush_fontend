import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component'
import './App.css';

const Rushing = loadable(() => import('./components/Rushing'));


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Football Rushing</p>
        </header>
        <body>
          <BrowserRouter>
            <Switch>
              <Route path="/" name="Home" component={Rushing} />
              {/*<Route component={Notfound} />*/}
            </Switch>
          </BrowserRouter>
        </body>
      </div>
    );
  }
}

export default App;
