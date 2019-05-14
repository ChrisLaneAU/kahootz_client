import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Timer.scss";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   count: 5
    // };
    // this._startCountdown = this._startCountdown.bind(this);
  }

  renderTimer (){
    if ( this.props.count === 0 ){
      return (
        ""
      )
    } else {
      return (
        <p>{this.props.count}</p>
      )
    }
  }

  renderSkipLink() {

    return (
      <button className="skip-link"
              onClick={this.props.skip_question}
            >
            SKIP
      </button>
    )
  }

  render() {
    return (
      <div className="timer">
        { localStorage.getItem('jwt') ? this.renderSkipLink() : '' }
        <div className="timer__face">
          <div className="timer__numbers">
            { this.renderTimer() }
          </div>
        </div>
      </div>
    );
  }

  _startCountdown = () => {
    this.myInterval = setInterval(() => {
      // this.setState({
      //   count: this.state.count - 1
      // });

      this.props.adjustCount( this.props.count - 1 )

      if (this.props.count === 0) {
        clearInterval(this.myInterval);
      }
    }, 1000);
  };

  componentDidMount() {
    // const { startCount } = this.props;
    // this.setState({
    //   count: startCount
    // });

    this._startCountdown();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
}
