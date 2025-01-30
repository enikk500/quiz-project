import React, { Component } from 'react';
import '../css/Component.css'
import '../css/Explore.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class ExploreCompetitions extends Component {
  constructor() {
    super();
    this.state = {
      competitions: []
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem("authenticated") == "true") {
      fetch('http://localhost:8080/explore/', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(competitions => this.setState({ competitions: competitions }));
    }
    else {
      window.location = "/login/";
    }
  }

  render() {
    return (
      <div className="container component-container">

        <div className="card-columns">
          {this.state.competitions.length > 0 && this.state.competitions.map(function (item) {
            return (
              <Link to={'/Competition/' + item.id} className="custom-card">
                <div key={item.name} className="card text-white bg-info mb-3 text-center">
                  <div className="h3 card-text explore-card-text">
                    {item.name}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {this.state.competitions.length == 0 &&
          <div className="text-center display-4">
            <br />
            <p>Опросов еще нет</p>
          </div>
        }
        <footer className="fixed-bottom">
          <div className="row add-competition-button">
            <div className="col-sm-4"></div>
            {sessionStorage.getItem("authenticated") == "true" &&
              <div className="col-sm-4">
                <Link to={'/create/competition/'} className="btn btn-lg btn-block btn-success">Добавить опрос</Link>
              </div>
            }
          </div>
        </footer>
      </div>
    );
  }
}

export default ExploreCompetitions;
