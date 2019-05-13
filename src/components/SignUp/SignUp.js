import React, { Component, Redirect } from "react";
import { Link } from "react-router-dom";
import './SignUp.scss'
import Input from '../sharedUI/Input/Input'
import Button from '../sharedUI/Button/Button'
import axios from 'axios'

const USER_CREATE_URL = "https://kahootz.herokuapp.com/users/create"
const USER_TOKEN_URL = "https://kahootz.herokuapp.com/quizzes/user_token"

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password_confirmation: ""
    }
    this._handleEmailInput = this._handleEmailInput.bind(this)
    this._handlePasswordInput = this._handlePasswordInput.bind(this)
    this._handlePasswordAgainInput = this._handlePasswordAgainInput.bind(this)
    this._handleSignupSubmit = this._handleSignupSubmit.bind(this)
  }



  _handleEmailInput(event) {
    this.setState({ email: event.target.value })
  }

  _handlePasswordInput(event) {
    this.setState({ password: event.target.value })
  }

  _handlePasswordAgainInput(event) {
    this.setState({ password_confirmation: event.target.value })
  }

  _handleSignupSubmit(event) {
    event.preventDefault();
    localStorage.setItem('jwt', undefined)
    
    const { email, password, password_confirmation } = this.state 

    const request = { "email": email, "password": password, "password_confirmation": password_confirmation }

    axios.post(USER_CREATE_URL, request).then((response) => {
      console.log('succesfully created the user with ', response )

      axios.post(USER_TOKEN_URL, { "auth": { "email": email, "password": password } }).then(data => {
        console.log('second part', data.data.jwt)
        localStorage.setItem('jwt', data.data.jwt)

      })
    })
    //BENS FUNCTION
  }

  render() {
    return (
      <div className="signup">
        <form className="signup__form">
          <h1>SignUp</h1>
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
          <Input type="password"
            class="input"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this._handlePasswordAgainInput}
          />
          <Button type="button" text="SignUp" onClick={this._handleSignupSubmit} />
          <Link to="/login" className="small">Already Have An Account? Login</Link>
        </form>
      </div>
    )

  }
}