import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { ReactComponent as ContactIcon } from "../media/contact.svg";
import { ReactComponent as EmailIcon } from "../media/email.svg";
import { ReactComponent as CalendarIcon } from "../media/calendar.svg";
import { ReactComponent as LocationIcon } from "../media/location.svg";
import { ReactComponent as TelephoneIcon } from "../media/telephone.svg";
const ContactBox = () => {
    const params = useParams()
    const lang = params.language
    const [toggle, setToggle] = useState(false)

    const toggleHandler = () => {
        setToggle(!toggle)
    }

    return (
        <>
            <div className={toggle ? 'contact-wrapper' : 'contact-wrapper-none'}>
                <a href="tel:0840 78 78 77">
                    <div className='d-flex mt-3'>
                        <div className='contact-toggle-1 icons-contact' >
                            <div className='d-flex justify-content-center'>
                                <TelephoneIcon height={20} />
                            </div>
                            <p className='text-light text-center icon-text'>
                                {lang == "en" ? "Telephone" : lang == "it" ? "Telefono" : lang == "de" ? "Telefon" : lang == "fr" ? "Téléphone" : "Telephone"}
                            </p>
                        </div>
                    </div>
                </a>
                <div className='d-flex'>
                    <a href="mailto:business@firstcaution.ch">
                        <div className='contact-toggle-2 icons-contact' >
                            <div className='d-flex justify-content-center'>
                                <EmailIcon height={20} />
                            </div>
                            <p className='text-light icon-text'>
                                {lang == "en" ? "E-mail" : lang == "it" ? "E-mail" : lang == "de" ? "E-mail" : lang == "fr" ? "E-mail" : "E-mail"}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div className={!toggle ? 'contact-toggle-on contact-btn' : 'contact-toggle-off contact-btn'} onClick={toggleHandler}>
                <div className='d-flex justify-content-center'>
                    <ContactIcon height={20} />
                </div>
                <p className='text-light icon-text'>
                    {lang == "en" ? "Contact" : lang == "it" ? "Contatto" : lang == "de" ? "Kontact" : lang == "fr" ? "Contact" : "Contact"}
                </p>
            </div>
        </>
    )
}

export default ContactBox