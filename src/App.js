import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { API } from 'aws-amplify'

class App extends Component {
  state = { people: [] }
  async componentDidMount() {
    const data = await API.get('peopleapi', '/people')
    this.setState({ people: data.people })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.state.people.map((person, i) => (
            <div>
              <h3>{ person.name }</h3>
              <p>{ person.hair_color }</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true })


