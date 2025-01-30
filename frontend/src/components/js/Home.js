import React, { Component } from 'react';
import '../css/Home.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="container text-center component-container">
        {sessionStorage.getItem("authenticated") != "true" &&
          <div>
            <br></br>
            <br></br>
            <p className="display-4 text-center">Опросы</p>
            <p className="display-4 text-center">Здесь вы можете пройти разные опросы</p>
            <p className="display-5 text-center">by Enver Fazlmemet</p>
            <br></br>
            <br></br>
            <div className="row component-container">
              <div className="col-sm-2"></div>
              <div className="col-sm-4">
                <Link to={'/login/'} className="btn btn-primary btn-block btn-lg"><strong className="h3">Залогиниться</strong></Link>
              </div>
              <div className="col-sm-2"></div>
              <div className="col-sm-4">
                <Link to={'/signup/'} className="btn btn-success btn-block btn-lg"><strong className="h3">Зарегистрироваться</strong></Link>
              </div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        }
        {sessionStorage.getItem("authenticated") == "true" &&
          <div>
            <br></br>
            <br></br>
            <p className="display-2 text-center">Добро пожаловать</p>
            <br></br>
            <div className="row component-container">
              <div className="col-sm-5"></div>
              <div className="col-sm-4">
                <Link to={'/explore/'} className="btn btn-primary btn-block btn-lg"><strong className="h3">Начать</strong></Link>
              </div>
              <div className="col-sm-4"></div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Home;
