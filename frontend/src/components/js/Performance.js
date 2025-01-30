import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class Performance extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: 0,
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        scores: [],
        totalscore: 0
      },
      competitions: [],
      chosen: -1
    };
    this.findCompetition = this.findCompetition.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("authenticated") == "true") {
      fetch('http://localhost:8080/performance/' + String(sessionStorage.getItem("id")), {
        method: 'GET'
      })
        .then(response => response.json())
        .then(user => { this.setState({ user: user }) });

      fetch('http://localhost:8080/explore/', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(competitions => {
          this.setState({
            competitions: competitions

          })
        });

    }

    else {
      window.location = "/login/";
    }
  }


  findCompetition(index) {
    for (var i = 0; i < this.state.competitions.length; i++) {

      if (this.state.competitions[i].id == this.state.user.scores[index].Competitionid) {
        return this.state.competitions[i].name;
      }
    }
  }



  render() {
    return (
      <div className="container">
        {this.state.user.scores.length > 0 &&
          <p className="display-3 text-center">Мои результаты</p>
        }
        {this.state.user.scores.length == 0 &&
          <div className="text-center display-4">
            <br />
            <p>Вы не прошли ни один опрос.</p>
            <p>Поиграйте немного и вернитесь, чтобы оценить свою эффективность.</p>
          </div>
        }
        <br></br>
        <br></br>
        {this.state.user.scores.length > 0 &&
          <table className="table table-dark">
            <thead className="thead-dark">
              <tr>
                <th>Опросы</th>
                <th>Очки</th>
                <th>Попытки</th>
              </tr>
            </thead>
            <tbody>
              {this.state.user.scores.map(function (score, index) {
                return (
                  <tr key={index}>
                    <td>{this.findCompetition(index)}</td>
                    <td>{score.value}</td>
                    <td>{score.attempts}</td>
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

export default Performance;
