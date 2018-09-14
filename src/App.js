import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Auth } from 'aws-amplify'

class App extends Component {
  state = { username: '', password: '', email: '', phone_number: '', authenticationCode: '', step: 0 }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number } })
      console.log('successfully signed up!')
      this.setState({ step: 1 })
    } catch (err) { console.log('error signing up: ', err) }
  }
  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state
    try {
      await Auth.confirmSignUp(username, authenticationCode)
      console.log('user successfully signed up!')
    } catch (err) { console.log('error confirming sign up: ', err)}
  }
  render() {
    return (
      <div className="App">
        {
          this.state.step === 0 && (
            <div>
              <input placeholder='username' onChange={this.onChange} name='username' style={styles.input} />
              <input placeholder='password' onChange={this.onChange} name='password' type='password' style={styles.input} />
              <input placeholder='email' onChange={this.onChange} name='email' style={styles.input} />
              <input placeholder='phone number' onChange={this.onChange} name='phone_number' style={styles.input} />
              <button onClick={this.signUp}>Sign Up</button>
            </div>
          )
        }
        {
          this.state.step === 1 && (
            <div>
              <input placeholder='username' onChange={this.onChange} name='username' style={styles.input} />
              <input placeholder='authentication code' onChange={this.onChange} name='authenticationCode' style={styles.input} />
              <button onClick={this.confirmSignUp}>Confirm Sign Up</button>
            </div>
          )
        }
      </div>
    );
  }
}

const styles = {
  input: {
    height: 35, margin: 5
  }
}

export default App


