import React, {Component} from "react";
import { Link } from "react-router-dom";
import './SignUp.scss'
import Input from '../sharedUI/Input/Input'
import Button from '../sharedUI/Button/Button'



export default class SignUp extends Component {
    constructor(){
      super();
      this.state = {
        email: "",
        password: "" ,
        passwordagain: ""
      }
      this._handleEmailInput = this._handleEmailInput.bind(this)
      this._handlePasswordInput = this._handlePasswordInput.bind(this)
      this._handlePasswordAgainInput = this._handlePasswordAgainInput.bind(this)
      this._handleSignupSubmit = this._handleSignupSubmit.bind(this)
    }

  
    _handleEmailInput(event){
      this.setState({email: event.target.value})
    }

    _handlePasswordInput(event){
      this.setState({password: event.target.value})
    }

    _handlePasswordAgainInput(event){
      this.setState({passwordagain: event.target.value})
    }

    _handleSignupSubmit(event){
      event.preventDefault();
      this.setState({email: this.state.email, 
                     password: this.state.password, 
                     passwordagain: this.state.passwordagain
                    })
      //BENS FUNCTION
    }
  
  render(){
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
                           placeholder="Password Again" 
                           value={this.state.password} 
                           onChange={this._handlePasswordAgainInput}
                    />
                  <Button type="button" text="SignUp" onClick={this._handleSignupSubmit}/>
                  <Link to="/login" className="small">Already Have An Account? Login</Link>
                </form>
    </div>
  )
  }
}