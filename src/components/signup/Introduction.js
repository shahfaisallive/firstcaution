import React from 'react'
import { Link } from 'react-router-dom'

const Introduction = ({ language, content }) => {
    return (
        <div className='container pt-5'>
            <p className='text-center form-head1'>{content.intro_text}</p>
            <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center mt-5'>
                    <Link to={`/${language}/signup/new/information/commercial`}>
                        <img src='/images/rentalimg.PNG' width={300} alt="imggg" className='img1' />
                    </Link>
                </div>
                <div className='d-flex justify-content-center mt-5 ml-3'>
                    <Link to={`/${language}/signup/new/information/private`}>
                        <img src='/images/privateImg.PNG' height={255} width={300} alt="imggg" className='private-img' />
                    </Link>
                </div>
            </div>
    </div>
    )
}

export default Introduction