import React, { Component } from 'react';
import "./WrongAnswer.scss"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faTimesCircle)


class WrongAnswer extends Component {

    render() {
        return (
            <div className="wronganswer">

                <div className="wronganswer__content">
                    <p className="wronganswer__heading">Wrong!</p>
                    <FontAwesomeIcon className="wronganswer__icon" icon="times-circle" />
                    <p className="wronganswer__body">Your Score: 1023</p>
                </div>
            </div>
        )
    }
}

export default WrongAnswer;