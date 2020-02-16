import React from 'react'

// Axios
import Axios from 'axios'

// Material-UI
import { Button, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core/";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Components
import Navbar from './Navbar'

let token = window.localStorage.getItem('Briskontoken')

class Writeablog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            content: '',
            matchId: '',
            blogsArr: '',
            status: false,
            flag : false,
            numberOfOrders : ''
        }
    }

    componentDidMount = () => {
        this.setState({
            matchId: this.props.match.params.id
        }, () => {
            Axios.get(`http://127.0.0.1:5000/getparticulararticle/${this.state.matchId}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        product: res.data,
                        blogsArr: res.data[0].blogs,
                        numberOfOrders : res.data[0].Orders
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

    handleClick = () => {
        Axios.post(`http://127.0.0.1:5000/blog/${this.state.matchId}`, {
            content: this.state.content
        }, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(() => console.log('error'))
        this.setState({
            content: ''
        })
        this.props.history.push('/')
    }

    render() {
        const { flag, numberOfOrders, product, content, status, blogsArr } = this.state
        return (
            <div>
                <Navbar />
                {product.map(e => {
                    return (
                        <div className='card my-3 shadow container' key={e._id.$oid}>
                            <div className='row'>
                                <div className='col-lg-8 col-md-12 col-sm-6 mx-3 my-3'>
                                    <h4 className='text-muted' style={{ fontFamily: 'Proza Libre' }}>{e.productName}</h4>
                                    <div>
                                        <p className='my-3' style={{ fontFamily: 'Open Sans', color: '#aa614a' }} ><b>Category:</b> <span style={{ color: 'black' }}>{e.productType}</span></p>
                                        <p className='my-3' style={{ fontFamily: 'Open Sans' }} >Rs. {e.productPrice}</p>
                                        {flag ? 
                                        <p className='my-3' style={{ fontFamily: 'Open Sans' }} >Number Of Orders: {numberOfOrders.length}</p> : <p className='my-3' style={{ fontFamily: 'Open Sans' }} >Number Of Orders: 0</p>}
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
                <div className='container text-center my-3'>
                    <h3 style={{ fontFamily: 'Proza Libre', color: '#aa614a' }}><b>Here You Go</b></h3>
                </div>
                <div className='contanier text-center my-3'>
                    <textarea name='content' className='container' value={content} placeholder='write your blog article here...' onChange={this.handleChange} style={{ width: '100%', height: 200 }} /> <br />
                    <Button variant="contained" color="secondary" onClick={this.handleClick}>Submit</Button>
                </div>
            </div>
        )
    }
}

export default Writeablog