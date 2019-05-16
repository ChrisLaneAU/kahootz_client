import React, { Component } from 'react';
import "./CorrectAnswer.scss"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { gamesRef } from "../../../config/firebase"


library.add(faCheckCircle)

class CorrectAnswer extends Component {

    

    render() {
        const gameRef = gamesRef.child(this.props.gamesPin);
        gameRef.on('value', snapshot => {
            if ( snapshot.val().getOffResults === 0 ){
                this.props.resetTimer( 0 )
                gameRef.child('getOffResult').set(1)
            }
        })

        // this.props.resetAnswer( false )
        return (
            <div className="correctanswer ">

                <div className="correctanswer__content rotate-scale-up">
                    <p className="correctanswer__heading">CORRECT!</p>
                    <FontAwesomeIcon className="correctanswer__icon" icon="check-circle" />
                    <p className="correctanswer__body">Your Score Is: { this.props.score }</p>
                </div>
            </div>
        )
    }
}

export default CorrectAnswer;