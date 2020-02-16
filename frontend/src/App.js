import React from 'react'

// React-router-dom
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import Landingpage from './components/Landingpage'
import Login from './components/Login'
import Signup from './components/Signup'
import Writeblog from './components/Writeblog'
import Postproduct from './components/Postproduct'
import Order from './components/Order'
import Update from './components/Update'
import Dashboard from './components/Dashboard'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Router>
                    <Route path='/' exact component={Landingpage} />
                    <Route path='/auth/login' component={Login} />
                    <Route path='/auth/signup' component={Signup} />
                    <Route path='/post' component={Postproduct} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/writeblog/:id' render={(props) => <Writeblog {...props}/>} />
                    <Route path='/order/:id' render={(props) => <Order {...props}/>} />
                    <Route path='/update/:id' render={(props) => <Update {...props}/>} />
                </Router>
            </div>
        )
    }
}

export default App