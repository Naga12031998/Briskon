import React from 'react'

// Components
import Navbar from './Navbar'
import Productview from './Productview'

class Landingpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <Navbar />
                <Productview />
            </div>
        )
    }
}

export default Landingpage