import React, { Component } from 'react';
import './JoinGameForm.scss'
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
                    <input className="joingame__input" onChange={this._handlePinInput} value={this.state.pin}></input>
                    {/* <Input onChange={} type="joingame__input" value=""/> */}
                    <Button text="Join Game" onClick={this.props.click} type="joingame__button" />
                </form>
            </div>
        )
    }
}

export default JoinGameForm;