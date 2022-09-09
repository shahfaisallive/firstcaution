import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { ReactComponent as ContactIcon } from "../media/contact.svg";

const ContactBox = () => {
    const params = useParams()
    const lang = params.language
    const [wrapperClass, setWrapperClass] = useState('contact-wrapper-none')
    const [toggleClass, setToggleClass] = useState("contact-toggle")

    const toggleHandler = () => {
        setWrapperClass('contact-wrapper')
        setToggleClass("contact-toggle-none")
    }

    const closeHandler = () => {
        setWrapperClass('contact-wrapper-none')
        setToggleClass("contact-toggle")
    }

    return (
        <>
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
            <div className={toggleClass} onClick={toggleHandler}>
                <div className='d-flex justify-content-center'>
                    <ContactIcon />
                </div>
                <p className='text-light text-center'>
                    {lang == "en" ? "Contact" : lang == "it" ? "Contatto" : lang == "de" ? "Kontact" : lang == "fr" ? "Contact" : "Contact"}
                </p>
            </div>
        </>
    )
}

export default ContactBox