import React from 'react'

// Axios
import Axios from 'axios'

// Components
import Navbar from './Navbar'

// Material-UI
import { CssBaseline, Container, Button, TextField, Typography, Grid } from "@material-ui/core/";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productType: '',
            productPrice: '',
            imgLocation: '',
            array: []
        }
    }

    componentDidMount = () => {
        let matchId = this.props.match.params.id
        Axios.get(`http://127.0.0.1:5000/getparticulararticle/${matchId}`)
            .then(res => {
                console.log(res.data[0]['productName'])
                this.setState({
                    array: res.data
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePhotoChange = (e) => {
        this.setState({
            imgLocation: e.target.files[0]
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        if (this.state.productName === '' || this.state.productType === '' || this.state.productPrice === '' || this.state.imgLocation === '') {
            alert(`Fill up the required field`)
        }
        else {
            const formData = new FormData()
            formData.append('image', this.state.imgLocation)
            let matchId = this.props.match.params.id
            Axios.patch(`http://127.0.0.1:5000/updatepost/${matchId}`, formData, {
                headers: {
                    productName: this.state.productName,
                    productType: this.state.productType,
                    productPrice: this.state.productPrice,
                    "Content-type": "application/json"
                }
            })
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        productName: '',
                        productType: '',
                        productPrice: '',
                        imgLocation: ''
                    })
                }, setTimeout(() => {
                    this.props.history.push('/dashboard')
                }, 1000))
        }
    }

    render() {
        const { productName, productType, productPrice, array } = this.state
        return (
            <div>
                <Navbar />
                {array.map(e => {
                    return (
                        <div className='card mt-3 shadow container' key={e._id.$oid}>
                            <div className='row'>
                                <div className='col-lg-8 col-md-12 col-sm-6 mx-3 my-3'>
                                    <h4 className='text-muted' style={{ fontFamily: 'Proza Libre' }}>{e.productName}</h4>
                                    <div>
                                        <p className='my-3' style={{ fontFamily: 'Open Sans', color: '#aa614a' }} ><b>Category:</b> <span style={{ color: 'black' }}>{e.productType}</span></p>
                                        <p className='my-3' style={{ fontFamily: 'Open Sans' }} >Rs. {e.productPrice}</p>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6'>
                                    <img src={`http://127.0.0.1:5000/${e.imgLocation}`} className="img-fluid my-3" style={{ borderRadius: 10 }} alt='Pic' />
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Container component="main" maxWidth="xs" style={{ marginTop: 40 }}>
                    <CssBaseline />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
                            Update Your Product Here
                        </Typography>
                        <form style={{ width: "100%" }} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="uname"
                                        name="productName"
                                        value={productName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="productName"
                                        label='productName'
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="productType"
                                        label='productType'
                                        name="productType"
                                        value={productType}
                                        onChange={this.handleChange}
                                        autoComplete="productType"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="productPrice"
                                        value={productPrice}
                                        onChange={this.handleChange}
                                        label='productPrice'
                                        type="number"
                                        id="productPrice"
                                        autoComplete="productPrice"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={this.handlePhotoChange}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="secondary" component="span" startIcon={<CloudUploadIcon />}>
                                            Upload
                                        </Button>
                                        <span> <b>Upload Your Product Image Here</b></span>
                                    </label>
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
        )
    }
}

export default Update