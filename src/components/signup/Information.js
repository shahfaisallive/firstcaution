import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ContactBox from '../ContactBox';

const Information = ({ setFormData, language, data, content }) => {
    const urlParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    // Data stored from APIs
    const [civilities, setCivilities] = useState([{
        label: "Mr",
        value: "Mr"
    },
    {
        label: "Ms.",
        value: "Ms."
    }])
    const [countries, setCountries] = useState([{
        label: "Switzerland",
        value: "CH"
    }])


    // Form Input states
    const [civility, setCivility] = useState("Mr")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDob] = useState()
    const [nationality, setNationality] = useState("CH")
    const [street, setStreet] = useState("")
    const [no, setNo] = useState()
    const [zipCode, setZipCode] = useState()
    const [locality, setLocality] = useState("")
    const [country, setCountry] = useState("CH")
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")
    const [utmSource, setUtmSource] = useState("")
    const [utmCompaign, setUtmCompaign] = useState("")
    const [utmMedium, setUtmMedium] = useState("")


    const nextPageHandler = () => {
        localStorage.setItem('civility', civility);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('dob', dob);
        localStorage.setItem('nationality', nationality);
        localStorage.setItem('street', street);
        localStorage.setItem('no', no);
        localStorage.setItem('zipCode', zipCode);
        localStorage.setItem('locality', locality);
        localStorage.setItem('country', country);
        localStorage.setItem('number', number);
        localStorage.setItem('email', email);
        localStorage.setItem('utmSource', utmSource);
        localStorage.setItem('utmCompaign', utmCompaign);
        localStorage.setItem('utmMedium', utmMedium);

        navigate("/" + language + "/signup/guarantee")
    }

    useEffect(() => {
        const getFormData = async () => {
            // setLoading(true);
            const res = await axios.get("https://firstcaution-partner-service-eapi-dev.de-c1.cloudhub.io/api/global-configuration")
            if (language == "en") {
                setFormData(res.data.en_US)
            } else if (language == "it") {
                setFormData(res.data.it)
            } else if (language == "de") {
                setFormData(res.data.de)
            } else if (language == "fr") {
                setFormData(res.data.fr)
            }

            // setLoading(false)
        }

        getFormData()

        setUtmSource(urlParams.get('utm_source'))
        setUtmCompaign(urlParams.get('utm_compaign'))
        setUtmMedium(urlParams.get('utm_medium'))

    }, [])

    useEffect(() => {
        console.log(data)
        if (data) {
            setCivilities(data.civilities)
            setCountries(data.countries)
        }
    }, [data])


    return (
        <div className='info-wrapper container'>
            <ContactBox />
            <Breadcrumbs level={2} content={content} />
            <Link to={`/${language}/signup`}><p className='previous-text'>&lt;  {content.previous} </p></Link>

            <div className='row'>
                <div className='col-sm-8 form-div mt-3'>
                    <p className='form-text1'>{content.info_head1}</p>

                    <form onSubmit={nextPageHandler}>
                        <div className="form-group mt-4">
                            <label htmlFor="civility" className='form-label'>{content.civility}</label>
                            <select className="form-control" id="civility" onChange={(e => setCivility(e.target.value))}>
                                {civilities.map((civility) => <option value={civility.value} key={civility.value}>{civility.label}</option>
                                )}
                            </select>
                        </div>
                        <div className='row d-flex justify-content-start mt-1'>
                            <div className="form-group col-6">
                                <label htmlFor="firstname" className='form-label'>{content.first_name}</label>
                                <input type="text" className="form-control" id="firstname" onChange={(e => setFirstName(e.target.value))} required />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="lastname" className='form-label'>{content.last_name}</label>
                                <input type="text" className="form-control" id="lastname" onChange={(e => setLastName(e.target.value))} required />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-start mt-1'>
                            <div className="form-group col-6">
                                <label htmlFor="dob" className='form-label'>{content.date_of_birth}</label>
                                <input type="date" className="form-control" id="dob" onChange={(e => setDob(e.target.value))} required />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="nationality" className='form-label'>{content.nationality}</label>
                                <select defaultValue='CH' required className="form-control" id="nationality" onChange={(e => setNationality(e.target.value))}>
                                    {countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <p className='form-text1 mt-5'>{content.info_head2}</p>

                        <div className='row d-flex justify-content-start mt-1'>
                            <div className="form-group col-8">
                                <label htmlFor="street" className='form-label' >{content.street}</label>
                                <input type="text" className="form-control" id="street" onChange={(e => setStreet(e.target.value))} required />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="number" className='form-label'>{content.no}</label>
                                <input type="number" className="form-control" id="number" onChange={(e => setNo(e.target.value))} />
                            </div>
                        </div>

                        <div className='row d-flex justify-content-start mt-1'>
                            <div className="form-group col-6">
                                <label htmlFor="zip" className='form-label'>{content.zip_code}</label>
                                <input type="text" className="form-control" maxLength={4} id="zip" onChange={(e => setZipCode(e.target.value))} required />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="locality" className='form-label'>{content.locality}</label>
                                <input type="text" className="form-control" id="locality" onChange={(e => setLocality(e.target.value))} required />
                            </div>
                        </div>

                        <div className="form-group mt-1">
                            <label htmlFor="country" className='form-label'>{content.country}</label>
                            <select defaultValue='CH' className="form-control" id="country" onChange={(e => setCountry(e.target.value))} required>
                                {countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>
                                )}
                            </select>
                        </div>

                        <p className='form-text1 mt-5'>{content.info_head3}</p>

                        <div className='row d-flex justify-content-start mt-1'>
                            {/* <div className="form-group col-4">
                                    <label htmlFor="mobile" className='form-label'>{content.mobile}</label>
                                    <input type="number" className="form-control" id="mobile" onChange={(e => setMobile(e.target.value))} />
                                </div>
                                <div className="form-group col-8">
                                    <label htmlFor="num" className='form-label'>{content.number}</label>
                                    <input type="text" className="form-control" id="num" onChange={(e => setNumber(e.target.value))} />
                                </div> */}
                            <div className="form-group col-12">
                                <label htmlFor="num" className='form-label'>{content.number}</label>
                                <PhoneInput
                                    defaultCountry='CH'
                                    placeholder="Enter phone number"
                                    value={number}
                                    onChange={setNumber} className="phone-input-field" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className='form-label'>{content.email}</label>
                            <input type="email" className="form-control" id="email" onChange={(e => setEmail(e.target.value))} required />
                        </div>

                        <div className='row d-flex justify-content-center mt-4'>
                            <button className='btn next-btn' type='submit'>NEXT</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Information