import React, { Component } from 'react';
import "./Podium.scss"

class Podium extends Component {
    render() {
            return (
            <div className = "display">
                <div className = "podium">
                    <div className = "podium__second">
                        <div className = "podium__second--place">
                        
                        </div>
                    </div>
                    <div className = "podium__first">
                        <div className = "podium__first--place">
                        
                        </div>
                    </div>
                    <div className = "podium__third">
                        <div className = "podium__third--place">
                        
                        </div>
                    </div> 
                </div>
            </div>

        )
    }
}

export default Podium;