import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { Link } from "react-router-dom";
import './Login.scss'
import Input from '../sharedUI/Input/Input'
import Button from '../sharedUI/Button/Button'
import axios from 'axios'

const USER_TOKEN_URL = "https://kahootz.herokuapp.com/quizzes/user_token" // change to heroku

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    }
    this._handleEmailInput = this._handleEmailInput.bind(this)
    this._handlePasswordInput = this._handlePasswordInput.bind(this)
    this._handleLoginSubmit = this._handleLoginSubmit.bind(this)
  }

  _handleEmailInput(event) {
    this.setState({ email: event.target.value })
  }

  _handlePasswordInput(event) {
    this.setState({ password: event.target.value })
  }

  _handleLoginSubmit(event) {
    event.preventDefault();
    // this.setState({ email: this.state.login, password: this.state.password })
    const { email, password } = this.state 

    const request = { "auth": { "email": email, "password": password } }
    axios.post(USER_TOKEN_URL, request).then((result) => {
        console.log('after', result.data.jwt)
        localStorage.setItem('jwt', result.data.jwt)
      })
    }

    //setup logic, here for testing

  render() {
    return (

      <div className="login">
        <form className="login__form">
          <h1>Login</h1>
          <Input type="email"
            class="input"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this._handleEmailInput}
          />

          <Input type="password"
            class="input"
            placeholder="Password"
            value={this.state.password}
            onChange={this._handlePasswordInput}
          />
          <Button type="button" text="Login" onClick={this._handleLoginSubmit} />
          <Link to="/signup" className="small">No Account? SignUp</Link>
        </form>
      </div>


      // <Link to="/signup">Sign Up</Link>
      // <Link to="/dashboard">Log In</Link>


  );
}
};

export default Login;
