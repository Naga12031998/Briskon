import React from "react";

// Material-UI
import { CssBaseline, Container, Button, TextField, Typography, Grid } from "@material-ui/core/";

// React-router-dom
import { Link } from "react-router-dom";

// Axios
import Axios from 'axios'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            email: "",
            password: ""
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleClick = (e) => {
        e.preventDefault()
        if (this.state.userName === '' || this.state.email === '' || this.state.password === '') {
            alert(`Fill up the required field`)
        } else {
            Axios.post(`http://127.0.0.1:5000/auth/signup`, {
                userName : this.state.userName,
                email : this.state.email,
                password : this.state.password
            })
            .then(res => {
                alert(`${res.data.status}`)
                if(res.data.status !== 'email already taken') {
                    this.props.history.push('/auth/login')
                }
            })
            this.setState({
                userName : '',
                email : '',
                password : ''
            })
        }
    };

    render() {
        const { userName, email, password } = this.state;
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: 100 }}>
                <CssBaseline />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
                        Sign up
                    </Typography>
                    <form style={{ width: "100%" }} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="uname"
                                    name="userName"
                                    value={userName}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: 15 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.handleClick}
                            >
                                Sign Up
              </Button>
                        </div>

                        <Grid container justify="flex-end" style={{ marginTop: 20 }}>
                            <Grid item>
                                <Link to="/auth/login" variant="body2">
                                    <i>Already have an account? Log in</i>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Signup;