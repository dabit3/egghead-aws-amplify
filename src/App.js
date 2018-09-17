import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { Storage } from 'aws-amplify'

class App extends Component {
  state = { file: '', filename: '' }
  componentDidMount() {
    Storage.list('')
      .then(d => {
        console.log('s3 data: ', d)
      })
      .catch(err => {
        console.log('error: ', err)
      })
  }
  handleChange = (e) => {
    const file = e.target.files[0];
    console.log('file: ', file)
    this.setState({
      fileName: file.name,
      file: URL.createObjectURL(file)
    })
  }
  saveFile = () => {
    Storage.put(this.state.filename, this.state.file, {
      contentType: 'image/png'
    })
    .then (result => {
      console.log(result)
      alert('image successfully uploaded!')
      this.setState({ file: '' })
    })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={this.handleChange}/>
        <img src={this.state.file}/>
        <button onClick={this.saveFile}>Save File</button>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true })


