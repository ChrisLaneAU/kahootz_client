import React, { Component } from 'react';
import './JoinGameForm.scss'
import { Link } from "react-router-dom";
import Button from '../../sharedUI/Button/Button'
import Input from '../../sharedUI/Input/Input'

class JoinGameForm extends Component {
    constructor() {
        super();
        this.state = {
            pin: ""
        }
        this._handlePinInput = this._handlePinInput.bind(this)
    }

    _handlePinInput(event) {
       this.setState({pin: event.target.value});
    }

    render() {
        return (
            <div className="joingame">
                <form className="joingame__form">
                    <h1>Join Game</h1>
                    <Input onChange={this._handlePinInput} type="text" class="input" value={this.state.pin}/>
                    <Button text="Join Game" onClick={event => {
                      event.preventDefault();
                      this.props.click(this.state.pin);
                    }} type="button" />
                    <Link className = "small" to="/login">Login To Create Quiz</Link>
                </form>
            </div>
        )
    }
}

export default JoinGameForm;
