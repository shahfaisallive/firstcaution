import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


const Introduction = ({language, content}) => {
    return (
        <div className='container pt-5'>
            <p className='text-center form-head1'>{content.intro_text}</p>
            <div className='d-flex justify-content-center mt-5'>
                <Link to={`/${language}/signup/information`}>
                    <img src='/images/rentalimg.PNG' width={300} alt="imggg" className='img1' />
                </Link> 
            </div>
        </div>
    )
}

export default Introduction