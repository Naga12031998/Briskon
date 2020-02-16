import React from 'react'

// Components
import Navbar from './Navbar'

// Axios
import Axios from 'axios'

// Material-UI
import { CssBaseline, Container, Button, TextField, Typography, Grid } from "@material-ui/core/";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

var token = window.localStorage.getItem('Briskontoken')

class Postproduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            productType: "",
            productPrice: '',
            imgLocation: ''
        }
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
        if (this.state.productName === '' || this.state.productType === '' || this.state.productPrice === ''|| this.state.imgLocation === '') {
            alert(`Fill up the required field`)
        }
        else {
            const formData = new FormData()
            formData.append('image', this.state.imgLocation)
            Axios.post(`http://127.0.0.1:5000/post/product`, formData, {
                headers: {
                    Authorization: "Bearer " + token,
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
                },setTimeout(() => {
                    this.props.history.push('/')
                },1000))
        }
    }

    render() {
        const { productName, productType, productPrice } = this.state;
        return (
            <div>
                <Navbar />
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
                            Post Your Product Here
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
                                        label="Product Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="productType"
                                        label="Product Type"
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
                                        label="Product Price"
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

export default Postproduct