import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = ({ changeLanguage, language }) => {

    return (
        <nav className={`navbar navbar-expand-lg navbar-light fixed-top navbar-wrap`}>
            <div className='container-fluid ml-5 mr-5'>
                <a href='/' className="navbar-brand" id="brand-title" to="/"><img alt="logo" src={"/images/logo.png"} className='logo-img' id="navbar-logo"></img></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav mt-3">
                        <li className="nav-item d-flex mr-3">
                            <img className='nav-contact-icon' src="https://img.icons8.com/ios-glyphs/50/C2C2C2/phone-disconnected.png" />
                            <p className='nav-contact-text'>0840 78 78 77</p>
                        </li>
                        <li className="nav-item d-flex mr-3">
                            <img className='nav-contact-icon' src="https://img.icons8.com/ios-glyphs/50/C2C2C2/whatsapp.png" />
                            <p className='nav-contact-text'>022 318 59 39</p>
                        </li>
                        <li className="nav-item mr-5 d-flex mr-3">
                            <img className='nav-contact-icon' src="https://img.icons8.com/material-sharp/50/C2C2C2/mail.png" />
                            <p className='nav-contact-text'>business@firstcaution.ch</p>
                        </li>
                        <li className="nav-item mr-3">
                            <a href='https://www.firstcaution.ch/de/uber-uns/unternehmen-firstcaution/' target={"_blank"} className="text-dark"><p>About Us</p></a>
                        </li>
                        <li className="nav-item mr-3">
                            <a href='https://www.firstcaution.ch/de/partner/verwaltungen-eigentumer/' target={"_blank"} className="text-dark"><p>Partner</p></a>
                        </li>
                        <li className="nav-item">
                            <select name="language" id="language" onChange={(e) => changeLanguage(e.target.value)}>
                                <option value="en">EN</option>
                                <option value="de">DE</option>
                                <option value="it">IT</option>
                                <option value="fr">FR</option>
                            </select>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link signup-btn" to={`/${language}/signup`}><p className='text-light ml-3 mr-3'>SIGN UP NOW</p></NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
