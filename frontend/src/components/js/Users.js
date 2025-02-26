import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleAccessClick = this.handleAccessClick.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("authenticated") == "true") {
      fetch('http://localhost:8080/users/', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(users => { this.setState({ users: users }) });
    }
    else {
      window.location = "/login/";
    }
  }

  handleDeleteClick(event) {
    fetch('http://localhost:8080/users/delete', {
      method: 'DELETE',
      body: JSON.stringify(this.state.users[event.target.value]),
    })
      .then(response => {
        if (response.status == 200) {
          window.location = "/users/";
        }
      });
  }

  handleAccessClick(event) {
    fetch('http://localhost:8080/users/grant', {
      method: 'PUT',
      body: JSON.stringify(this.state.users[event.target.value]),
    })
      .then(response => {
        if (response.status == 200) {
          window.location = "/users/";
        }
      });
  }

  render() {
    return (
      <div className="container">
        {this.state.users.length == 0 &&
          <div className="text-center display-4">
            <br />
            <p>Нет зарегистрированных пользователей.</p>
          </div>
        }
        {this.state.users.length > 0 &&
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(function (user, index) {
                return (
                  <tr key={index}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.username}</td>
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

export default Users;
