import React, { useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import { ReactComponent as EditIcon } from "../../media/edit-icon.svg";
import { ReactComponent as HouseIcon } from "../../media/house.svg";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import ContactBox from '../ContactBox';

const Confirmation = ({ language, content }) => {

    const navigate = useNavigate()
    const [submitLoader, setSubmitLoader] = useState(false)
    const [data, setData] = useState()
    const [civility, setCivility] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDob] = useState()
    const [nationality, setNationality] = useState("")
    const [nationalityName, setNationalityName] = useState("")
    const [street, setStreet] = useState("")
    const [no, setNo] = useState()
    const [zipCode, setZipCode] = useState()
    const [locality, setLocality] = useState("")
    const [country, setCountry] = useState("")
    const [countryName, setCountryName] = useState("")
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
    const [utmCompaign, setUtmCompaign] = useState("")
    const [type, setType] = useState("")

    const [confirmAuthenticity, setConfirmAuthenticity] = useState(false)
    const [confirmTOC, setConfirmTOC] = useState(false)

    const validationSchema = yup.object({
        request_nature: yup.string().required("Required").min(3, "Channel Name Must be Greater than 3 Characters"),
        language: yup.string().required("Required").min(3, "Creator Name Must be Greater than 3 Characters"),
        first_name: yup.string().required("Required"),
        real_estate_city: yup.string().required("Required"),
        real_estate_zip_code: yup.string().required("Required"),
        real_estate_address: yup.string().required("Required"),
        real_estate_name: yup.string().required("Required"),
        lease_type: yup.string().required("Required"),
        address_country_id: yup.string().required("Required"),
        address_zip_code: yup.string().required("Required"),
        address_house_nr: yup.string().required("Required"),
        address_street: yup.string().required("Required"),
        mobile_phone: yup.string().required("Required"),
        email: yup.string().required("Required"),
        residence_permit_id: yup.string().required("Required"),
        nationality_id: yup.string().required("Required"),
        birthday: yup.string().required("Required"),
        premise_street: yup.string().required("Required"),
        premise_house_nr: yup.string().required("Required"),
        premise_zip_code: yup.string().required("Required"),
        premise_city: yup.string().required("Required"),
        premise_country_id: yup.string().required("Required"),
        guarantee_amount: yup.string().required("Required"),
        rent_amount: yup.string().required("Required"),
        promotional_code: yup.string().required("Required"),
        tenants: yup.string().required("Required"),
        utm_source: yup.string().required("Required"),
        utm_medium: yup.string().required("Required"),
        utm_compaign: yup.string().required("Required"),
    });
    
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("data")))
        setCivility(localStorage.getItem("civility"))
        setFirstName(localStorage.getItem("firstName"))
        setLastName(localStorage.getItem("lastName"))
        setDob(localStorage.getItem("dob"))
        setNationality(localStorage.getItem("nationality"))
        setType(localStorage.getItem("type"))
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
        setGuaranteeAmount(parseInt(localStorage.getItem("guaranteeAmount")))
        setMoveInDate(localStorage.getItem("moveInDate"))
        setPromoCode(localStorage.getItem("promoCode"))
        setLeaseFile(localStorage.getItem("leaseFile"))
        setLeaseFileName(localStorage.getItem("leaseFileName"))
        setIdFile(localStorage.getItem("IdFile"))
        setIdFileName(localStorage.getItem("IdFileName"))
        setUtmSource(localStorage.getItem("utmSource"))
        setUtmCompaign(localStorage.getItem("utmCompaign"))
        setUtmMedium(localStorage.getItem("utmMedium"))
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

    useEffect(() => {
        if (data) {
            console.log(data)
            const countryName = data.countries.find(c => c.value == country)
            const nationalityName = data.countries.find(c => c.value == nationality)
            setCountryName(countryName.label)
            setNationalityName(nationalityName.label)
        }
    }, [data])

    const dataSubmitHandler = async () => {
        console.log(language)
        if (confirmAuthenticity && confirmTOC) {
            setSubmitLoader(true)
            // const token = await axios.get("http://localhost:4000/api/auth-token",
            // const token = await axios.get("https://backendlanding.firstcaution.ch/api/auth-token",
            //     {
            //         Headers: {
            //             'Content-Type': 'application/json',
            //         }
            //     })
            // console.log(token.data.access_token)

            const bodyObj = {
                request_nature: "certificate",
                language: language,
                civility_id: civility,
                first_name: firstName,
                last_name: lastName,
                birthday: dob,
                nationality_id: nationality,
                residence_permit_id: "RESID0709",
                email: email,
                mobile_phone: number,
                address_street: street,
                address_house_nr: no,
                address_zip_code: zipCode,
                address_city: locality,
                address_country_id: country,
                lease_type: type,
                real_estate_name: "",
                real_estate_address: "",
                real_estate_zip_code: "",
                real_estate_city: "",
                premise_street: guaranteeStreet,
                premise_house_nr: guaranteeNo ? guaranteeNo : null,
                premise_zip_code: guaranteeZipCode ? guaranteeZipCode : null,
                premise_city: guaranteeLocality ? guaranteeLocality : "",
                premise_country_id: "",
                guarantee_amount: guaranteeAmount ? guaranteeAmount : null,
                rent_amount: 3000,
                promotional_code: promoCode,
                tenants: tenants,
                utm_source: utmSource ? utmSource : " ",
                utm_compaign: utmCompaign ? utmCompaign : " ",
                utm_medium: utmMedium ? utmMedium : " "

            }
            console.log("payload", bodyObj)

            validationSchema.validate(bodyObj).catch(function (err) {
                console.log(err.name, err.errors)
            });
            // const response = await axios.post("https://firstcaution-partner-service-eapi.de-c1.cloudhub.io/api/provisional-certificate",
            //     bodyObj,
            //     { headers: { "Authorization": `Bearer ${token.data.access_token}` } })

            // console.log(response.data.data.token)
            // // console.log(leaseFile)

            // const fileData = [
            //     {
            //         fileName: leaseFileName,
            //         fileBase64: leaseFile
            //     },
            //     {
            //         fileName: IdFileName,
            //         fileBase64: IdFile
            //     }
            // ]

            // if (response.data.data.status == "accepted") {
            //     console.log(fileData)
            //     const fileRes = await axios.post(`https://firstcaution-partner-service-eapi.de-c1.cloudhub.io/api/register/${response.data.data.token}/files`, fileData,
            //         { headers: { "Authorization": `Bearer ${token.data.access_token}` } })

            //     console.log(fileRes)
            //     setSubmitLoader(false)
            //     navigate("/" + language + "/signup/confirmed")
            // } else {
            //     alert("Data not correct")
            // }

        } else {
            document.getElementById("form-submit-authenticate").style.display = "block"
        }
    }

    return (
        <div className='info-wrapper container'>
            <ContactBox />
            <Breadcrumbs level={4} content={content} />
            <Link to={`/${language}/signup/guarantee`}><p className='previous-text'>&lt;  {content.previous} </p></Link>

            <div className='row'>
                <div className='col-sm-8 mt-3'>
                    <p className='detail-text1 text-center'>{content.conf_head1}</p>

                    <div className='detail-div pl-5'>
                        <div className='row'>
                            <p className='form-text1'>{content.conf_head2}</p>
                        </div>
                        <div className='row'>
                            <HouseIcon />
                            <p className='detail-text2 ml-2'>{type}</p>
                        </div>
                    </div>

                    <div className='detail-div mt-4 pl-5'>
                        <div className='d-flex justify-content-between'>
                            <p className='form-text1'>{content.conf_head3}</p>
                            <Link to={`/${language}/signup/edit/information/${type}`}>
                                <EditIcon />
                            </Link>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <p className='detail-text3'>{content.about_you}</p>

                                <p className='detail-text4'>{content.civility}</p>
                                <p className='detail-text5'>{civility}</p>

                                <p className='detail-text4'>{content.first_name}</p>
                                <p className='detail-text5'>{firstName}</p>

                                <p className='detail-text4'>{content.last_name}</p>
                                <p className='detail-text5'>{lastName}</p>

                                <p className='detail-text4'>{content.date_of_birth}</p>
                                <p className='detail-text5'>{dob}</p>

                                <p className='detail-text4'>{content.nationality}</p>
                                <p className='detail-text5'>{nationalityName}</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>{content.current_address}</p>

                                <p className='detail-text4'>{content.street + " & " + content.no}</p>
                                <p className='detail-text5'>{street + " " + no}</p>

                                <p className='detail-text4'>{content.locality}</p>
                                <p className='detail-text5'>{locality}</p>

                                <p className='detail-text4'>{content.country}</p>
                                <p className='detail-text5'>{countryName}</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>{content.contact_details}</p>

                                <p className='detail-text4'>{content.mobile}</p>
                                <p className='detail-text5'>{number}</p>

                                <p className='detail-text4'>{content.email}</p>
                                <p className='detail-text5'>{email}</p>
                            </div>
                        </div>
                    </div>

                    <div className='detail-div mt-4 pl-5'>
                        <div className='d-flex justify-content-between'>
                            <p className='form-text1'>{content.conf_head4}</p>
                            <Link to={`/${language}/signup/edit/guarantee/`}>
                                <EditIcon />
                            </Link>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <p className='detail-text3'>{content.price_calc}</p>

                                <p className='detail-text4'>{content.amount_in_guarantee}</p>
                                <p className='detail-text5'>CHF {guaranteeAmount}</p>

                                <p className='detail-text4'>{content.mone_in_date}</p>
                                <p className='detail-text5'>{moveInDate}</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>{content.address_of_guar}</p>

                                <p className='detail-text4'>{content.street + " & " + content.no}</p>
                                <p className='detail-text5'>{guaranteeStreet + " " + guaranteeNo}</p>

                                <p className='detail-text4'>{content.locality}</p>
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
                                I confirm that I have read and accept the <a href='https://www.firstcaution.ch/en/about-us/general-terms-and-conditions/'>Terms and Condition.</a>
                            </label>
                        </div>
                    </div>


                    <div className='row d-flex justify-content-center mt-5'>
                        {!submitLoader ? <button className='btn next-btn' onClick={dataSubmitHandler}>Submit</button> :
                            <button className='btn next-btn'><div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div></button>}
                    </div>

                    <div className="alert alert-danger mt-2" role="alert" id='form-submit-authenticate'>
                        Please confirm the terms and conditions!
                    </div>


                </div>
            </div>

        </div>)
}

export default Confirmation