import React, { Component } from 'react';
class NicknameForm extends Component {
    constructor(){
        super();
        this.state = {
            nickname: ""
        }
        this._handleNicknameInput = this._handleNicknameInput.bind(this);
        this._handleNicknameSubmit = this._handleNicknameSubmit.bind(this);
    }

    _handleNicknameInput(event){
        this.setState( {nickname: event.target.value})
        console.log(event.target.value);
    }

    _handleNicknameSubmit(event){
        event.preventDefault()
        
        console.log(`Nickname Submitted - ${this.state.nickname} is JOINING GAME`);
    }

    render() {
        return (
            <>
                <div className="nickname">
                    <form className="nickname__form">
                        <h1>Enter Your Nickname</h1>
                        <input className="nickname__input" onChange={this._handleNicknameInput} ></input>
                        <button className="nickname__button"onClick={this._handleNicknameSubmit}>Join Game</button>
                    </form>
                </div>
            </>
        )
    }
}

export default NicknameForm;