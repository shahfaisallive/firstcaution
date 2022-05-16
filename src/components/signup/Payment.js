import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'

const Payment = () => {

    return (
        <div className='info-wrapper container'>
            <Breadcrumbs level={5} />
            <Link to="/signup/confirmation">
                <p className='previous-text'>&lt;  Previous </p>
            </Link>

            <div className='row'>
                <p className='text-center display-3'>Payment Screen Content</p>
            </div>
        </div>
    )
}

export default Payment