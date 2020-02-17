import React from 'react'

// Material-UI
import { Button } from "@material-ui/core/";

// Axios
import Axios from 'axios'

class Productview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productArr: [],
            status: false,
            userName: '',
            numberOfOrders: ''
        }
        setTimeout(() => {
            var token = window.localStorage.getItem('Briskontoken')
            if (token != null) {
                this.setState({
                    status: true
                })
            }
        }, 100)
    }

    componentDidMount = () => {
        var token = window.localStorage.getItem('Briskontoken')
        Axios.get(`http://127.0.0.1:5000/getallproducts`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    productArr: res.data
                })
            })
            .catch(() => console.log('error'))

        if (token) {
            Axios.get(`http://127.0.0.1:5000/greetuser`, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-type": "application/json"
                }
            })
                .then(res => {
                    this.setState({
                        userName: res.data,
                    })
                })
                .catch(() => console.log('error'))
        }
    }

    render() {
        const { productArr, status, userName } = this.state
        return (
            <div>
                {status ? <div className='my-3 container'>
                    <h4 style={{ fontFamily: 'Proza Libre', color: '#aa614a' }}><b>{userName}</b></h4>
                </div> : null}
                {status ?
                    <div className='container my-3'>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <label style={{ fontFamily: 'Open Sans' }}>You can also Post your product here</label><br />
                                <Button variant="contained" color="primary" href={`/post`}>Post</Button>
                            </div>
                            <div className='mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <label></label>
                                <Button variant="contained" color="primary" href={`/dashboard`}>DashBoard</Button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='container my-3'>
                        <h3>Login to write a Blog about each product</h3>
                        <Button variant="outlined" color="primary" href='/auth/login'>Login</Button>
                    </div>}
                {productArr.map(e => {
                    return (
                        <div className='card my-3 container shadow' key={e._id.$oid}>
                            <div className='row'>
                                <div className='col-lg-8 col-md-12 col-sm-6 mx-3 my-3'>
                                    <h4 className='text-muted' style={{ fontFamily: 'Proza Libre' }}>{e.productName}</h4>
                                    <div>
                                        <p className='my-3' style={{ fontFamily: 'Open Sans', color: '#aa614a' }} ><b>Category:</b> <span style={{ color: 'black' }}>{e.productType}</span></p>
                                        <p className='my-3' style={{ fontFamily: 'Open Sans' }} >Rs. {e.productPrice}</p>
                                        <p className='text-muted' style={{ float: 'right' }}><i>--- Postedby, {e.postedBy}</i></p>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6'>
                                    <img src={`http://127.0.0.1:5000/${e.imgLocation}`} className="img-fluid my-3" style={{ borderRadius: 10 }} alt='Pic' />
                                </div>
                                <div className='row'>
                                    {status ?
                                        <div className='mx-3 my-3 col-xl-12 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                            <Button variant="contained" color="secondary" href={`/writeblog/${e._id.$oid}`}>Write a blog</Button>
                                        </div> :
                                        <div className='mx-3 my-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                            <Button variant="contained" color="primary" href={`/order/${e._id.$oid}`}>buy</Button>
                                        </div>}
                                </div>
                                <div className='col-1'></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Productview