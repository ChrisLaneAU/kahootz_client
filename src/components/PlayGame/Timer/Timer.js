import React, { Component } from 'react';
import "./Timer.scss"
class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: 20 
        }
    } 

    render() {
        return (
         <div className="timer">
            <div className="timer__face">
                <div className="timer__numbers">  
                    <p>{this.state.count}</p>
                </div>
             </div>
        </div>
        )
    }

    _startCountdown = () =>{
        if(this.state.count <= 0){
        this.myInterval = setInterval(()=>{
            this.setState(prevState =>({
                count: prevState.count - 1
            }))
        }, 1000)
    }
    }

    componentDidMount(){
        const {startCount} = this.props
        this.setState({
            count: startCount
        })
        
        this._startCountdown()
    
}

    _componentWillUnmount(){
        clearInterval(this.myInterval)
    }

}

export default Timer;