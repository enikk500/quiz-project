import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class LeaderboardAll extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      scores: [],
      chosen: -1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("authenticated") == "true") {
      fetch('http://localhost:8080/leaderboard/', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(users => { this.setState({ users: users }) });

      fetch('http://localhost:8080/explore/', {
        method: 'GET'
      })
    }
    else {
      window.location = "/login/";
    }
  }

  handleChange(event) {
    this.setState({ chosen: Number(event.target.value) });
    if (event.target.value != -1) {
      fetch('http://localhost:8080/leaderboard/')
        .then(response => response.json())
        .then(scores => { this.setState({ scores: scores }); });
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.users.length > 0 &&
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <select className="form-control" value={this.state.chosen} onChange={this.handleChange} required>
                <option value={-1}>All</option>
              </select>
            </div>
            <div className="col-sm-4"></div>
          </div>
        }
        {this.state.users.length == 0 && this.state.chosen == -1 &&
          <div className="text-center display-4">
            <br />
            <p>Нет зарегистрированных пользователей.</p>
          </div>
        }
        {this.state.scores.length == 0 && this.state.chosen != -1 &&
          <div className="text-center display-4">
            <br />
            <p>Никто из пользователей еще не прошел опрос.</p>
          </div>
        }
        <br></br>
        <br></br>
        {this.state.users.length > 0 && this.state.chosen == -1 &&
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(function (user, index) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.totalscore}</td>
                  </tr>
                )
              }, this)}
            </tbody>
          </table>
        }
        {this.state.scores.length > 0 && this.state.chosen != -1 &&
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.scores.map(function (score, index) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.username}</td>
                    <td>{score.value}</td>
                  </tr>
                )
              }, this)}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default LeaderboardAll;
