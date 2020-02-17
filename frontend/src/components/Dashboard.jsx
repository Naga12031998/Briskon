import React from 'react'

// Navbar
import Navbar from './Navbar'

// Axios
import Axios from 'axios'

// Material-UI
import { Button } from "@material-ui/core/";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDataArr: [],
            status: false
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = () => {
        var token = window.localStorage.getItem('Briskontoken')
        Axios.get(`http://127.0.0.1:5000/getproducts`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.length !== 0) {
                    this.setState({
                        userDataArr: res.data,
                        status: true
                    })
                }
            })
            .catch(() => console.log('error'))
    }

    handleDelete = (id) => {
        Axios.delete(`http://127.0.0.1:5000/deletepost/${id}`)
            .then(res => {
                console.log(res.data)
            }, setTimeout(() => {
                this.fetchData()
            }, 1000))
    }

    render() {
        const { userDataArr,status } = this.state
        return (
            <div>
                <Navbar />
                {status ?
                    <div>
                        {userDataArr.map(e => {
                            return (
                                <div className='card my-3 container shadow' key={e._id.$oid}>
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
                                        <div className='row'>
                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-2'>
                                                <Button variant="contained" color="primary" href={`/update/${e._id.$oid}`}>Update</Button>
                                            </div>
                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-2'>
                                                <Button variant="contained" color="secondary" onClick={() => this.handleDelete(e._id.$oid)}>Delete</Button>
                                            </div>
                                        </div>
                                        <div className='col-1'></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div> : <h1 className='container text-center'>You have't posted yet</h1>}


            </div>
        )
    }
}

export default Dashboard