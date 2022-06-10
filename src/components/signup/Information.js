import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { useNavigate } from 'react-router-dom';


const Information = ({ setFormData }) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    // Data stored from APIs
    const [civilities, setCivilities] = useState([])
    const [countries, setCountries] = useState([])


    // Form Input states
    const [civility, setCivility] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDob] = useState()
    const [nationality, setNationality] = useState("")
    const [street, setStreet] = useState("")
    const [no, setNo] = useState()
    const [zipCode, setZipCode] = useState()
    const [locality, setLocality] = useState("")
    const [country, setCountry] = useState("")
    const [mobile, setMobile] = useState()
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")


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
        localStorage.setItem('mobile', mobile);
        localStorage.setItem('number', number);
        localStorage.setItem('email', email);

        navigate("/signup/guarantee")
    }

    useEffect(() => {
        const getFormData = async () => {
            setLoading(true);
            const res = await axios.get("https://firstcaution-partner-service-eapi-dev.de-c1.cloudhub.io/api/global-configuration")
            await setFormData(res.data)
            console.log(res.data.en_US)
            await setCivilities(res.data.en_US.civilities)
            await setCountries(res.data.en_US.countries)

            setLoading(false)
        }

        getFormData()

    }, [])


    return (
        <div className='info-wrapper container'>
            <Breadcrumbs level={2} />
            <Link to={"/signup"}><p className='previous-text'>&lt;  Previous </p></Link>

            <div className='row'>
                <div className='col-sm-8 form-div mt-3'>
                    <p className='form-text1'>We just need some information</p>
                    <div className="form-group mt-4">
                        <label htmlFor="civility" className='form-label'>Civility</label>
                        <select className="form-control" id="civility" onChange={(e => setCivility(e.target.value))}>
                            {civilities.map((civility) => <option value={civility.value} key={civility.value}>{civility.label}</option>
                            )}
                        </select>
                    </div>
                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <label htmlFor="firstname" className='form-label'>First Name</label>
                            <input type="text" className="form-control" id="firstname" onChange={(e => setFirstName(e.target.value))} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="lastname" className='form-label'>Last Name</label>
                            <input type="text" className="form-control" id="lastname" onChange={(e => setLastName(e.target.value))} />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <label htmlFor="dob" className='form-label'>Date of Birth</label>
                            <input type="date" className="form-control" id="dob" onChange={(e => setDob(e.target.value))} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="nationality" className='form-label'>Nationality</label>
                            <select className="form-control" id="nationality" onChange={(e => setNationality(e.target.value))}>
                                {countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <p className='form-text1 mt-5'>What is your current address?</p>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-8">
                            <label htmlFor="street" className='form-label' >Street</label>
                            <input type="text" className="form-control" id="street" onChange={(e => setStreet(e.target.value))} />
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="number" className='form-label'>No.</label>
                            <input type="number" className="form-control" id="number" onChange={(e => setNo(e.target.value))} />
                        </div>
                    </div>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <label htmlFor="zip" className='form-label'>Zip Code</label>
                            <input type="text" className="form-control" id="zip" onChange={(e => setZipCode(e.target.value))} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="locality" className='form-label'>Locality</label>
                            <input type="text" className="form-control" id="locality" onChange={(e => setLocality(e.target.value))} />
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="country" className='form-label'>Country</label>
                        <select className="form-control" id="country" onChange={(e => setCountry(e.target.value))}>
                            {countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>
                            )}
                        </select>
                    </div>

                    <p className='form-text1 mt-5'>How to contact you?</p>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-4">
                            <label htmlFor="mobile" className='form-label'>Mobile</label>
                            <input type="number" className="form-control" id="mobile" onChange={(e => setMobile(e.target.value))} />
                        </div>
                        <div className="form-group col-8">
                            <label htmlFor="num" className='form-label'>Number</label>
                            <input type="text" className="form-control" id="num" onChange={(e => setNumber(e.target.value))} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" className="form-control" id="email" onChange={(e => setEmail(e.target.value))} />
                    </div>

                    <div className='row d-flex justify-content-center mt-4'>
                        <button className='btn next-btn' onClick={nextPageHandler}>NEXT</button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Information