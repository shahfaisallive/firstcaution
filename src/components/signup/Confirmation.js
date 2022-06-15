import React, { useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import { ReactComponent as EditIcon } from "../../media/edit.svg";
import { ReactComponent as HouseIcon } from "../../media/house.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Confirmation = () => {
    const [submitLoader, setSubmitLoader] = useState(false)

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
    const [guaranteeStreet, setGuaranteeStreet] = useState("")
    const [guaranteeNo, setGuaranteeNo] = useState(0)
    const [guaranteeZipCode, setGuaranteeZipCode] = useState("")
    const [guaranteeLocality, setGuaranteeLocality] = useState("")
    const [guaranteeAmount, setGuaranteeAmount] = useState(0)
    const [moveInDate, setMoveInDate] = useState()
    const [promoCode, setPromoCode] = useState("")
    const [leaseFileName, setLeaseFileName] = useState("")
    const [leaseFile, setLeaseFile] = useState("")
    const [IdFileName, setIdFileName] = useState("")
    const [IdFile, setIdFile] = useState("")
    const [tenants, setTenants] = useState([])
    const [utmSource, setUtmSource] = useState("")
    const [utmMedium, setUtmMedium] = useState("")

    const [confirmAuthenticity, setConfirmAuthenticity] = useState(false)
    const [confirmTOC, setConfirmTOC] = useState(false)




    useEffect(() => {
        setCivility(localStorage.getItem("civility"))
        setFirstName(localStorage.getItem("firstName"))
        setLastName(localStorage.getItem("lastName"))
        setDob(localStorage.getItem("dob"))
        setNationality(localStorage.getItem("nationality"))
        setStreet(localStorage.getItem("street"))
        setNo(localStorage.getItem("no"))
        setZipCode(localStorage.getItem("zipCode"))
        setLocality(localStorage.getItem("locality"))
        setCountry(localStorage.getItem("country"))
        setMobile(localStorage.getItem("mobile"))
        setNumber(localStorage.getItem("number"))
        setEmail(localStorage.getItem("email"))
        setGuaranteeStreet(localStorage.getItem("guaranteeStreet"))
        setGuaranteeNo(localStorage.getItem("guaranteeNo"))
        setGuaranteeZipCode(localStorage.getItem("guaranteeZipCode"))
        setGuaranteeLocality(localStorage.getItem("guaranteeLocality"))
        setGuaranteeAmount(localStorage.getItem("guaranteeAmount"))
        setMoveInDate(localStorage.getItem("moveInDate"))
        setPromoCode(localStorage.getItem("promoCode"))
        setLeaseFile(localStorage.getItem("leaseFile"))
        setLeaseFileName(localStorage.getItem("leaseFileName"))
        setIdFile(localStorage.getItem("IdFile"))
        setIdFileName(localStorage.getItem("IdFileName"))
        setUtmSource(localStorage.getItem("utmSource"))
        setUtmMedium(localStorage.getItem("utmMedium"))
        // setTenants(JSON.parse(localStorage.getItem("tenants")))
        const tenantsArray = JSON.parse(localStorage.getItem("tenants"))

        let allTenants = tenantsArray.map((obj) => {
            let myKey = Object.values(obj)
            return {
                last_name: myKey[3],
                birthday: myKey[4],
                nationality_id: myKey[5],
                role_id: "1",
                civility_id: myKey[1],
                first_name: myKey[2]
            }
        })
        setTenants(allTenants)
    }, [])

    const dataSubmitHandler = async () => {
        if (confirmAuthenticity && confirmTOC) {
            setSubmitLoader(true)
            // const token = await axios.post("https://firstcaution-oauth2-provider-api-dev.de-c1.cloudhub.io/api/oauth2/token?client_id=CD342AFBAA01E0861D5E5646AD8A43B8&client_secret=8113264D3CD56EDD4F62D61B06A326A8&scope=USER&grant_type=CLIENT_CREDENTIALS",
            //     {
            //         'Content-Type': 'application/json'
            //     })
                const token = "qfnjNOiam6lYjyiYdiRBXobhATjWCGM-NcZycQLR-zHNTBVd2NaPQswHWLiHIE8VZLgTk_wq_ZCgSeqxLNtbQg"
                console.log(token)
            const response = await axios.post("https://firstcaution-partner-service-eapi-dev.de-c1.cloudhub.io/api/provisional-certificate",
                {
                    request_nature: "certificate",
                    language: "en",
                    civility_id: civility,
                    first_name: firstName,
                    last_name: lastName,
                    birthday: dob,
                    nationality_id: nationality,
                    residence_permit_id: "RESID0709",
                    email: email,
                    mobile_phone: mobile,
                    address_street: street,
                    address_house_nr: no,
                    address_zip_code: zipCode,
                    address_city: locality,
                    address_country_id: country,
                    lease_type: "residential",
                    real_estate_name: "test",
                    real_estate_address: "test street 11",
                    real_estate_zip_code: "21342134",
                    real_estate_city: "Islamabad",
                    premise_street: "streep1",
                    premise_house_nr: "55a",
                    premise_zip_code: "1006",
                    premise_city: "Lausanne",
                    premise_country_id: "CH",
                    guarantee_amount: guaranteeAmount,
                    rent_amount: 3000,
                    promotional_code: promoCode,
                    tenants: tenants
                },
                { headers: { "Authorization": `Bearer ${token}` } })

            console.log(response.data.data.token)
            // console.log(leaseFile)

            const fileData = [
                {
                    fileName: leaseFileName,
                    fileBase64: leaseFile
                },
                {
                    fileName: IdFileName,
                    fileBase64: IdFile
                }
            ]

            if (response.data.data.status == "accepted") {
                const fileRes = await axios.post(`https://firstcaution-partner-service-eapi-dev.de-c1.cloudhub.io/api/register/${response.data.data.token}/files`, fileData,
                    { headers: { "Authorization": `Bearer ${token}` } })

                console.log(fileRes)
                setSubmitLoader(false)
                alert("Data submitted successfully!")
                // navigate('/signup/payment')

            } else {
                alert("Data not correct")
            }

        } else {
            alert('Please confirm the authenticity and check the Terms of Conditions')
        }
    }

    return (
        <div className='info-wrapper container'>
            <Breadcrumbs level={4} />
            <Link to={"/signup/guarantee"}><p className='previous-text'>&lt;  Previous </p></Link>

            <div className='row'>
                <div className='col-sm-8 mt-3'>
                    <p className='detail-text1 text-center'>We are almost there. Is everything OK?</p>

                    <div className='detail-div pl-5'>
                        <div className='row'>
                            <p className='form-text1'>Services Requested</p>
                            {/* <span className='edit-btn mt-1'>
                                <p>Edit<EditIcon className='ml-2' /></p>
                            </span> */}
                        </div>
                        <div className='row'>
                            <HouseIcon />
                            <p className='detail-text2 ml-2'>Residential</p>
                        </div>
                    </div>

                    <div className='detail-div mt-4 pl-5'>
                        <div className='row'>
                            <p className='form-text1'>Your Information</p>
                            {/* <span className='edit-btn mt-1'>
                                <p>Edit<EditIcon className='ml-2' /></p>
                            </span> */}
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <p className='detail-text3'>About You</p>

                                <p className='detail-text4'>Civility</p>
                                <p className='detail-text5'>{civility}</p>

                                <p className='detail-text4'>First Name</p>
                                <p className='detail-text5'>{firstName}</p>

                                <p className='detail-text4'>Last Name</p>
                                <p className='detail-text5'>{lastName}</p>

                                <p className='detail-text4'>Date of Birth</p>
                                <p className='detail-text5'>{dob}</p>

                                <p className='detail-text4'>Nationality</p>
                                <p className='detail-text5'>{nationality}</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>Current Address </p>

                                <p className='detail-text4'>Street No.</p>
                                <p className='detail-text5'>{street}</p>

                                <p className='detail-text4'>Locality</p>
                                <p className='detail-text5'>{locality}</p>

                                <p className='detail-text4'>Country</p>
                                <p className='detail-text5'>{country}</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>Contact Details</p>

                                <p className='detail-text4'>Mobile</p>
                                <p className='detail-text5'>{mobile}</p>

                                <p className='detail-text4'>Email Address</p>
                                <p className='detail-text5'>{email}</p>
                            </div>
                        </div>
                    </div>

                    <div className='detail-div mt-4 pl-5'>
                        <div className='row'>
                            <p className='form-text1'>Your Information</p>
                            {/* <span className='edit-btn mt-1'>
                                <p>Edit<EditIcon className='ml-2' /></p>
                            </span> */}
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <p className='detail-text3'>Price Calculation</p>

                                <p className='detail-text4'>Amount of a guarantee</p>
                                <p className='detail-text5'>{guaranteeAmount}</p>

                                <p className='detail-text4'>From the</p>
                                <p className='detail-text5'>{guaranteeNo}</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>Address of a guarantee</p>

                                <p className='detail-text4'>Street No.</p>
                                <p className='detail-text5'>{guaranteeStreet}</p>

                                <p className='detail-text4'>Locality</p>
                                <p className='detail-text5'>{guaranteeLocality}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className='ml-5'>
                            <input className="form-check-input" type="checkbox" value="" id="confirmAuthenticity" onChange={() => setConfirmAuthenticity(!confirmAuthenticity)} />
                            <label className="form-check-label" htmlFor="confirmAuthenticity">
                                I confirm the authenticity of the entered and imported data.
                            </label>
                        </div>
                        <div className='ml-5'>
                            <input className="form-check-input" type="checkbox" value="" id="confirmToc" onChange={() => setConfirmTOC(!confirmTOC)} />
                            <label className="form-check-label" htmlFor="confirmToc">
                                I confirm that I have read and accept the Term and Condition.
                            </label>
                        </div>
                    </div>


                    <div className='row d-flex justify-content-center mt-5'>
                        {!submitLoader ? <button className='btn next-btn' onClick={dataSubmitHandler}>Submit</button> :
                            <button className='btn next-btn'><div class="spinner-border spinner-border-sm" role="status">
                                <span class="sr-only">Loading...</span>
                            </div></button>}
                    </div>


                </div>
            </div>

        </div>)
}

export default Confirmation