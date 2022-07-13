import React, { useState } from 'react'

const ContactBox = () => {
    const [wrapperClass, setWrapperClass] = useState('contact-wrapper')

    const closeHandler = () => {
        setWrapperClass('contact-wrapper-none')
    }

    return (
        <div className={wrapperClass}>
            <div className='row d-flex justify-content-end'>
                <button className='contact-close-btn' onClick={closeHandler}>x</button>
            </div>
            {/* <p className='text-dark contact-text1'><b>Contact us:</b></p> */}
            <div className='d-flex mt-3'>
                <img className='contact-icon' src="https://img.icons8.com/ios-glyphs/50/1859e6/phone-disconnected.png" />
                <a href="tel:0840 78 78 77"><p className='contact-text3 mt-1'>0840 78 78 77</p></a>
            </div>
            <div className='d-flex'>
                <img className='contact-icon' src="https://img.icons8.com/ios-glyphs/50/1859e6/whatsapp.png" />
                <a href="tel:022 318 59 39"><p className='contact-text3 mt-1'>022 318 59 39</p></a>
            </div>
            <div className='d-flex'>
                <img className='contact-icon' src="https://img.icons8.com/material-sharp/50/1859e6/mail.png" />
                <a href="mailto:business@firstcaution.ch"><p className='contact-text3 mt-1'>business@firstcaution.ch</p></a>
            </div>
        </div>
    )
}

export default ContactBox