import React, { Component } from 'react';
import '../css/Component.css'
import '../css/Explore.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class Panel extends Component {

  componentDidMount() {
    if (sessionStorage.getItem("authenticated") == "true") {
      ;
    }
    else {
      window.location = "/login/";
    }
  }

  render() {
    return (
      <div className="container component-container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Panel;
