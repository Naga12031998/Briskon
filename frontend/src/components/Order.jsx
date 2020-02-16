import React from 'react'

// Axios
import Axios from 'axios'

// Navbar
import Navbar from './Navbar'

// Material-UI
import { CssBaseline, Container, Button, TextField, Typography, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core/";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            flag: false,
            matchId: '',
            product: [],
            blogsArr: [],
            userName: '',
            email: '',
            mobileNumber: '',
            line1: '',
            city: '',
            pinCode: '',
            state: '',
            numberOfOrders: ''
        }
    }

    componentDidMount = () => {
        this.setState({
            matchId: this.props.match.params.id
        }, () => {
            Axios.get(`http://127.0.0.1:5000/getparticulararticle/${this.state.matchId}`)
                .then(res => {
                    this.setState({
                        product: res.data,
                        blogsArr: res.data[0].blogs,
                        numberOfOrders: res.data[0].Orders
                    }, () => {
                        if (this.state.blogsArr.length) {
                            this.setState({
                                status: true
                            })
                        }
                        if (this.state.numberOfOrders.length) {
                            this.setState({
                                flag: true
                            })
                        }
                    })
                })
        })

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        if (this.state.userName === '' || this.state.email === '' || this.state.mobileNumber === '' || this.state.line1 === '' || this.state.city === '' || this.state.state === '' || this.state.pinCode === '') {
            alert('Fillup the required field')
        }
        else {
            Axios.patch(`http://127.0.0.1:5000/order/${this.state.matchId}`, {
                userName: this.state.userName,
                email: this.state.email,
                mobileNumber: this.state.mobileNumber,
                line1: this.state.line1,
                city: this.state.city,
                state: this.state.state,
                pinCode: this.state.pinCode,
            })
                .then(res => {
                    console.log(res.data)
                    alert('Orderd Successfully')
                    this.setState({
                        userName: '',
                        email: '',
                        mobileNumber: '',
                        line1: '',
                        city: '',
                        state: '',
                        pinCode: '',
                    })
                    this.props.history.push('/')
                })
                .catch(() => alert('Something went wrong'))
        }
    }

    render() {
        const { numberOfOrders, flag, status, blogsArr, product, email, mobileNumber, line1, city, state, pinCode, userName } = this.state
        return (
            <div>
                <Navbar />
                {product.map(e => {
                    return (
                        <div className='card mt-3 shadow container' key={e._id.$oid}>
                            <div className='row'>
                                <div className='col-lg-8 col-md-12 col-sm-6 mx-3 my-3'>
                                    <h4 className='text-muted' style={{ fontFamily: 'Proza Libre' }}>{e.productName}</h4>
                                    <div>
                                        <p className='my-3' style={{ fontFamily: 'Open Sans', color: '#aa614a' }} ><b>Category:</b> <span style={{ color: 'black' }}>{e.productType}</span></p>
                                        <p className='my-3' style={{ fontFamily: 'Open Sans' }} >Rs. {e.productPrice}</p>
                                        {flag ?
                                            <p className='my-3' style={{ fontFamily: 'Open Sans' }} >Number Of Orders: {numberOfOrders.length}</p> :
                                            <p className='my-3' style={{ fontFamily: 'Open Sans' }} >Number Of Orders: 0</p>}
                                        <p className='text-muted' style={{ float: 'right' }}><i>--- Postedby, {e.postedBy}</i></p>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6'>
                                    <img src={`http://127.0.0.1:5000/${e.imgLocation}`} className="img-fluid my-3" style={{ borderRadius: 10 }} alt='Pic' />
                                </div>
                            </div>
                        </div>
                    )
                })}
                {status ?
                    <ExpansionPanel className="container-fluid">
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{ fontFamily: 'Proza Libre', color: '#aa614a' }}><b>Reviews</b></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div>
                                {blogsArr.map(e => {
                                    return (
                                        <div key={e.content}>
                                            <p>{e.content} <span className='text-muted'> ---{e.createdBy}</span></p>
                                        </div>
                                    )
                                })}
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    : <h3 className='mt-4 container text-center' style={{ fontFamily: 'Proza Libre', color: '#aa614a' }}><b>No reviews yet</b></h3>
                }
                <div>
                    <Container component="main" maxWidth="xs" style={{ marginTop: 50 }}>
                        <CssBaseline />
                        <div className='mb-3'
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
                                Enter Your Details
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
                                            autoComplete="uname"
                                            name="email"
                                            value={email}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type='number'
                                            id="mobileNumber"
                                            label="Mobile Number"
                                            name="mobileNumber"
                                            value={mobileNumber}
                                            onChange={this.handleChange}
                                            autoComplete="mobileNumber"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="line1"
                                            value={line1}
                                            onChange={this.handleChange}
                                            label="Line1"
                                            type="line1"
                                            id="line1"
                                            autoComplete="line1"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="city"
                                            value={city}
                                            onChange={this.handleChange}
                                            label="City"
                                            type="city"
                                            id="city"
                                            autoComplete="city"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type='number'
                                            name="pinCode"
                                            value={pinCode}
                                            onChange={this.handleChange}
                                            label="Pin Code"
                                            id="pinCode"
                                            autoComplete="pinCode"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="state"
                                            value={state}
                                            onChange={this.handleChange}
                                            label="State"
                                            type="state"
                                            id="state"
                                            autoComplete="state"
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
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Order