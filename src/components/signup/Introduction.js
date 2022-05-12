import React from 'react'
import { Link } from 'react-router-dom'

const Introduction = () => {
    return (
        <div className='container pt-5'>
            <p className='text-center form-head1'>Online Application Rental Guarantee</p>
            <div className='d-flex justify-content-center mt-5'>
                <Link to="/signup/information">
                    <img src='/images/rentalimg.png' width={300} alt="imggg" className='img1' />
                </Link> 
            </div>
        </div>
    )
}

export default Introduction