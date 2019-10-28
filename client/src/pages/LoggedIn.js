import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import Portfolio from './Portfolio';
import BuyStock from './BuyStock';
import ShowPostPage from './ShowPostPage';
import Transactions from './Transactions';

import '../App.css';


function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/Portfolio">My Portfolio</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/BuyStock">
            Buy Stocks
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/Transactions">
            Transactions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}


class LoggedIn extends React.Component {
  render() {
    return (
        <Router>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/BuyStock" component={BuyStock} />
                <Route path="/posts/:id" component={ShowPostPage} />
                <Route path="/Transactions" component={Transactions} />
                <Route path="/Portfolio" component={Portfolio} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default LoggedIn;