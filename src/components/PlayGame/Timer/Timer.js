import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Timer.scss"
class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: 20
        }
        this._startCountdown = this._startCountdown.bind(this)
    }

    render() {
        const { question_id, question, answers } = this.props.state;

        return (
         <div className="timer">
         <button className="skip-link">
            <Link to={{
                        pathname: `/game/${question_id}/scoreboard`,
                        state: {
                            question_id: question_id,
                            question: question,
                            answers: answers
                            }
                        }}
                    > Skip
            </Link>
                </button>
            <div className="timer__face">
                <div className="timer__numbers">
                    <p>{this.state.count}</p>
                </div>
             </div>
        </div>
        )
    }

    _startCountdown = () =>{
        const myInterval = setInterval(()=>{
            this.setState({
                count: this.state.count - 1
            })

            if ( this.state.count === 0 ){
                clearInterval( myInterval )
            };

        }, 1000)
    }
    

    componentDidMount = () => {
        const {startCount} = this.props
        this.setState({
            count: startCount
        })

        this._startCountdown()
    }


    _componentWillUnmount = () => {
        clearInterval(this.myInterval)
    }

}

export default Timer;
