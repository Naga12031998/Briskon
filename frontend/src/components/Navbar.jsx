import React from 'react'

// Material-UI
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

// React-router-dom
import { Redirect } from 'react-router-dom'


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            flag: false
        }
        setTimeout(() => {
            var token = window.localStorage.getItem('Briskontoken')
            if (token != null) {
                this.setState({
                    status: true
                })
            }
        }, 0)
    }

    handleLogout = () => {
        window.localStorage.removeItem('Briskontoken')
        this.setState({
            flag: true
        })
    }

    render() {
        const { status, flag } = this.state
        return (
            <div style={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" href='/'>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        {status ?
                            <Button color="inherit" onClick={this.handleLogout}>Logout</Button> : null}
                    </Toolbar>
                </AppBar>
                {flag ? <Redirect to='/auth/login' /> : null}
            </div>
        )
    }
}

export default Navbar