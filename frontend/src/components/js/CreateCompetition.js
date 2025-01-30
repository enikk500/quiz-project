import React, { Component } from 'react';
import '../css/CreateCompetition.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class CreateCompetition extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
      },
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("authenticated") == "true") {
    }
    else {
      window.location = "/login/";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8080/create/competition/', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
      .then(response => {
        if (response.status == 200) {

          window.location = "/explore/"
        }
      });
  }

  handleNameChange(event) {
    this.setState({
      formData: {
        name: event.target.value
      }
    });
  }

  render() {
    return (
      <div className="container">
        <p className="display-3 text-center add-competition-heading">Добавить опрос</p>
        <form onSubmit={this.handleSubmit}>
          {this.state.error &&
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-6">
                <div className="text-center alert alert-danger">
                  <span>
                    {this.state.error}
                  </span>
                </div>
              </div>
              <div className="col-sm-3"></div>
            </div>
          }
          <div className="form-group row">
            <div className="col-sm-3"></div>
            <div className="col-sm-4">
              <input type="text" className="form-control" value={this.state.formData.name} onChange={this.handleNameChange} required />
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-success btn-block">Добавить</button>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateCompetition;
