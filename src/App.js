import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { API, graphqlOperation } from 'aws-amplify'

const ListTodos = `
  query {
    listTodos {
      items {
        id name description completed
      }
    }
  }
`

class App extends Component {
  state = { todos: [] }
  async componentDidMount() {
    const todoData = await API.graphql(graphqlOperation(ListTodos))
    this.setState({ todos: todoData.data.listTodos.items })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.state.todos.map((todo, i) => (
            <div>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true })


