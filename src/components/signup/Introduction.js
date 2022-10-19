import React from 'react'
import { Link } from 'react-router-dom'

const Introduction = ({ language, content }) => {
    return (
        <div className='container pt-5'>
            <Link to={`/${language}`}><p className='previous-text'>&lt;  {content.previous} </p></Link>
            <p className='text-center form-head1'>{content.intro_text}</p>
            <div className='intro-sec-wrapper'>
                <div className='commercial-intro'>
                    <Link to={`/${language}/signup/new/information/commercial`}>
                        <img src='/images/rentalimg.PNG' width={300} alt="imggg" className='img1' />
                    </Link>
                </div>
                <div className='private-intro'>
                    <Link to={`/${language}/signup/new/information/residential`}>
                        <img src='/images/privateImg.png' height={255} width={300} alt="imggg" className='private-img' />
                    </Link>
                </div>
            </div>
    </div>
    )
}

export default Introduction