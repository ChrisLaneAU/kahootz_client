import React, { Component } from 'react';
import "./Podium.scss"

class Podium extends Component {
    render() {
        return (
            <div className="display">
                <div className="podium">
                    <div className="podium__second">
                        <div className="podium__second--player">
                            Chris
                        </div>
                        <div className="podium__second--place">
                            <p>2nd</p>
                        </div>
                    </div>
                    <div className="podium__first">
                        <div className="podium__first--player">
                            Ben
                        </div>
                        <div className="podium__first--place">
                            <p>1st</p>
                        </div>
                    </div>
                    <div className="podium__third">
                    <div className="podium__third--player">
                            Jimmy
                        </div>
                        <div className="podium__third--place">
                            <p>3rd</p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Podium;