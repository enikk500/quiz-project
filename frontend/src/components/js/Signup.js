import React, { Component } from 'react';
import Login from './Login'
import '../css/Signup.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        repeatpassword: "",
      },
      error: ""
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("authenticated") == "true") {
      window.location = "/";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.formData.password != this.state.formData.repeatpassword) {
      this.setState({
        formData: {
          username: this.state.formData.username,
          password: "",
          firstname: this.state.formData.firstname,
          lastname: this.state.formData.lastname,
          repeatpassword: ""
        },
        error: "Пароль и подтверждение должны быть одинаковыми"
      });
      this.forceUpdate();
    }
    else {
      fetch('http://localhost:8080/signup/', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      })
        .then(response => {
          if (response.status == 200) {
            this.setState({
              formData: {
                username: "",
                password: "",
                firstname: "",
                lastname: "",
                repeatpassword: ""
              },
              error: ""
            });
            window.location = "/login/";
          }
          else if (response.status == 400) {
            this.setState({
              formData: {
                username: "",
                password: "",
                firstname: "",
                lastname: "",
                repeatpassword: ""
              },
              error: "Пожалуйста, предоставьте все подробности"
            });
          }
        });
    }
  }

  handleUsernameChange(event) {
    this.setState({
      formData: {
        username: event.target.value,
        password: this.state.formData.password,
        firstname: this.state.formData.firstname,
        lastname: this.state.formData.lastname,
        repeatpassword: this.state.formData.repeatpassword,
      }
    });
  }

  handlePasswordChange(event) {
    this.setState({
      formData: {
        username: this.state.formData.username,
        password: event.target.value,
        firstname: this.state.formData.firstname,
        lastname: this.state.formData.lastname,
        repeatpassword: this.state.formData.repeatpassword,
      }
    });
  }

  handleRepeatPasswordChange(event) {
    this.setState({
      formData: {
        username: this.state.formData.username,
        password: this.state.formData.password,
        firstname: this.state.formData.firstname,
        lastname: this.state.formData.lastname,
        repeatpassword: event.target.value,
      }
    });
  }

  handleFirstNameChange(event) {
    this.setState({
      formData: {
        username: this.state.formData.username,
        password: this.state.formData.password,
        firstname: event.target.value,
        lastname: this.state.formData.lastname,
        repeatpassword: this.state.formData.repeatpassword,
      }
    });
  }

  handleLastNameChange(event) {
    this.setState({
      formData: {
        username: this.state.formData.username,
        password: this.state.formData.password,
        firstname: this.state.formData.firstname,
        lastname: event.target.value,
        repeatpassword: this.state.formData.repeatpassword,
      }
    });
  }

  render() {
    return (
      <div className="container">
        <p className="display-3 text-center signup-heading">Зарегистрироваться</p>
        <form onSubmit={this.handleSubmit}>
          {this.state.error &&
            <div className="alert alert-danger">
              <span>
                {this.state.error}
              </span>
            </div>
          }
          <div className="form-group row">
            <div className="col-sm-6">
              <label><strong>Имя</strong></label>
              <input className="form-control" type="text" value={this.state.formData.firstname} onChange={this.handleFirstNameChange} required></input>
            </div>
            <div className="col-sm-6">
              <label><strong>Фамилия</strong></label>
              <input className="form-control" type="text" value={this.state.formData.lastname} onChange={this.handleLastNameChange} required></input>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label><strong>Логин</strong></label>
              <input className="form-control" type="text" value={this.state.formData.username} onChange={this.handleUsernameChange} required></input>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label><strong>Пароль</strong></label>
              <input className="form-control" type="password" value={this.state.formData.password} onChange={this.handlePasswordChange} required></input>
            </div>
            <div className="col-sm-6">
              <label><strong>Повтори пароль</strong></label>
              <input className="form-control" type="password" value={this.state.formData.repeatpassword} onChange={this.handleRepeatPasswordChange} required></input>
            </div>
          </div>
          <div className="row signup-buttons">
            <div className="col text-center signup-button">
              <button type="submit" className="btn btn-success btn-block btn-lg"><strong>Зарегистрироваться</strong></button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
