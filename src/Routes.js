import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import JoinGame from './components/JoinGame/JoinGame'



const Routes = (
    <Router>
        <div>
            <Route exact path="/" component={JoinGame} />
        </div>
    </Router>
)

export default Routes;