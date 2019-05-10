import React, { Component } from 'react';
import JoinGameForm from './JoinGameForm/JoinGameForm'
import NicknameForm from './NicknameForm/NicknameForm'

class JoinGame extends Component {
    constructor() {
        super();
        this.state = {
            pin: false,
        }
        this._submitPin = this._submitPin.bind(this)
    }


    _submitPin(event) {
        event.preventDefault()
        this.setState({ pin: !this.state.pin })
       console.log(event.target.value);
    }

    render() {
        let currentUI = "";

        if (this.state.pin) {
            currentUI = <NicknameForm />
        } else {
            currentUI = <JoinGameForm click={this._submitPin} />
        }

        return (
            <>
                {currentUI}
            </>
        )
    }
}

export default JoinGame;