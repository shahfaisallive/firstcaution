import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = ({ changeLanguage, language, content }) => {
    const navigate = useNavigate()

    const [aboutLink, setAboutLink] = useState("https://www.firstcaution.ch/en/about-us/company-and-team")
    const [partnerLink, setPartnerLink] = useState("https://www.firstcaution.ch/en/partners/Property-management-companies-and-landlords/")
    const [faqLink, setFaqLink] = useState("https://www.firstcaution.ch/de/uber-uns/haufige-fragen/")

    useEffect(() => {
        if (language == "en") {
            setAboutLink("https://www.firstcaution.ch/en/about-us/company-and-team")
            setPartnerLink("https://www.firstcaution.ch/en/partners/Property-management-companies-and-landlords/")
        } else if (language == "it") {
            setAboutLink("https://www.firstcaution.ch/it/chi-siamo/azienda-collaboratori/")
            setPartnerLink("https://www.firstcaution.ch/it/partner/agenzie-proprietari/")
        } else if (language == "de") {
            setAboutLink("https://www.firstcaution.ch/de/uber-uns/unternehmen-firstcaution/")
            setPartnerLink("https://www.firstcaution.ch/de/partner/verwaltungen-eigentumer/")
        } else if (language == "fr") {
            setAboutLink("https://www.firstcaution.ch/fr/a-propos/entreprise-equipe/")
            setPartnerLink("https://www.firstcaution.ch/fr/partenaires/regies-proprietaires/")
        }
    }, [language])

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
                            <a href="tel:0840 78 78 77"> <p className='nav-contact-text'>0840 78 78 77</p></a>
                        </li>
                        <li className="nav-item d-flex mr-3">
                            <img className='nav-contact-icon' src="https://img.icons8.com/ios-glyphs/50/C2C2C2/whatsapp.png" />
                            <a href="tel:022 318 59 39"> <p className='nav-contact-text'>022 318 59 39</p></a>
                        </li>
                        <li className="nav-item mr-5 d-flex mr-3">
                            <img className='nav-contact-icon' src="https://img.icons8.com/material-sharp/50/C2C2C2/mail.png" />
                            <a href="mailto:business@firstcaution.ch"><p className='nav-contact-text'>business@firstcaution.ch</p></a>
                        </li>
                        <li className="nav-item mr-3">
                            <a href={aboutLink} target={"_blank"} className="text-dark"><p>{content.about_us}</p></a>
                        </li>
                        <li className="nav-item mr-3">
                            <a href={partnerLink} target={"_blank"} className="text-dark"><p>{content.Partner}</p></a>
                        </li>
                        <li className="nav-item mr-3">
                            <a href={faqLink} target={"_blank"} className="text-dark"><p>FAQ</p></a>
                        </li>
                        <li className="nav-item">
                            <select name="language" value={language} id="language" onChange={(e) => {
                                changeLanguage(e.target.value)
                                navigate(`/${e.target.value}`)
                            }}>
                                <option value="en">EN</option>
                                <option value="de">DE</option>
                                <option value="it">IT</option>
                                <option value="fr">FR</option>
                            </select>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link signup-btn" to={`/${language}/signup`}><p className='text-light ml-3 mr-3'>{content.sign_up}</p></NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav >
    )
}

export default Navbar
