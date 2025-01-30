import React, { Component } from 'react';
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Logout from './Logout'
import ExploreCompetitions from './ExploreCompetitions'
import CreateCompetition from './CreateCompetition'
import AddQuestion from './AddQuestion'
import Users from './Users'
import ViewCompetition from './ViewCompetition'
import Performance from './Performance'
import Panel from './Panel'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      isAuthenticated: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
              <Link to={'/'} className="navbar-brand">Enver`s Project</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  {sessionStorage.getItem("authenticated") == "true" &&
                    <li className="nav-item">
                      <Link to={'/explore/'} className="nav-link text-light">Посмотреть опросы</Link>
                    </li>
                  }
                  {sessionStorage.getItem("authenticated") != "true" &&
                    <li className="nav-item">
                      <Link to={'/login/'} className="nav-link text-light">Залогиниться</Link>
                    </li>
                  }
                  {sessionStorage.getItem("authenticated") != "true" &&
                    <li className="nav-item">
                      <Link to={'/signup/'} className="nav-link text-light">Зарегистрироваться</Link>
                    </li>
                  }
                  {sessionStorage.getItem("authenticated") == "true" &&
                    <li className="nav-item">
                      <Link to={'/performance/'} className="nav-link text-light">Результаты</Link>
                    </li>
                  }
                  {sessionStorage.getItem("authenticated") == "true" &&
                    <li className="nav-item">
                      <Link to={'/users/'} className="nav-link text-light">Пользователи</Link>
                    </li>
                  }
                  {sessionStorage.getItem("authenticated") == "true" &&
                    <li className="nav-item">
                      <Link to={'/logout/'} className="nav-link text-light">Выйти</Link>
                    </li>
                  }
                </ul>
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/index/" component={Home}></Route>
              <Route exact path="/signup/" component={Signup}></Route>
              <Route exact path="/login/" component={Login}></Route>
              <Route exact path="/logout/" component={Logout}></Route>
              <Route exact path="/explore/" component={ExploreCompetitions}></Route>
              <Route exact path="/Competition/:competitionid" component={ViewCompetition}></Route>
              <Route exact path="/performance/" component={Performance}></Route>
              <Route exact path="/create/competition/" component={CreateCompetition}></Route>
              <Route exact path="/create/question/:competitionid" component={AddQuestion}></Route>
              <Route exact path="/users/" component={Users}></Route>
              <Route exact path="/panel/" component={Panel}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
