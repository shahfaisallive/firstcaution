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
            <p><b>Contact us:</b></p>
            <div className='d-flex'>
                <img className='contact-icon' src="https://img.icons8.com/ios-glyphs/50/0000FF/phone-disconnected.png" />
                <p className='text-primary mt-1'>0840 78 78 77</p>
            </div>
            <div className='d-flex'>
                <img className='contact-icon' src="https://img.icons8.com/ios-glyphs/50/0000FF/whatsapp.png" />
                <p className='text-primary mt-1'>022 318 59 39</p>
            </div>
            <div className='d-flex'>
                <img className='contact-icon' src="https://img.icons8.com/material-sharp/50/0000FF/mail.png" />
                <p className='text-primary mt-1'>business@firstcaution.ch</p>
            </div>
        </div>
    )
}

export default ContactBox