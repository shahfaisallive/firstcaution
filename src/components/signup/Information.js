import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ContactBox from '../ContactBox';
import * as yup from "yup";
import { toast } from 'react-toastify'

const Information = ({ setFormData, language, data, content, changeLanguage }) => {
	const params = useParams()
	const { type, status } = params
	const langParam = params.language
	const navigate = useNavigate()

	// Data stored from APIs
	const [civilities, setCivilities] = useState([{
		label: "Herr",
		value: "Mr"
	},
	{
		label: "Frau",
		value: "Ms."
	}])
	const [countries, setCountries] = useState([{
		label: "Schweiz",
		value: "CH"
	}])

	const [civility, setCivility] = useState("Mr")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [dob, setDob] = useState()
	const [number, setNumber] = useState("")
	const [email, setEmail] = useState("")
	const [nationality, setNationality] = useState("CH")
	const [street, setStreet] = useState("")
	const [no, setNo] = useState()
	const [zipCode, setZipCode] = useState()
	const [locality, setLocality] = useState("")
	const [country, setCountry] = useState("CH")

	let numberRegex = /^\+[1-9]\d{10,14}$/

	useEffect(() => {
		changeLanguage(langParam)
		console.log("1", language)
		const getFormData = async () => {
			// setLoading(true);
			const res = await axios.get("https://firstcaution-partner-service-eapi.de-c1.cloudhub.io/api/global-configuration")
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
		if (status == 'edit') {
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
			setNumber(localStorage.getItem("number"))
			setEmail(localStorage.getItem("email"))
		}
	}, [status])

	useEffect(() => {
		console.log("2", language)
		console.log(data)
		if (data) {
			setCivilities(data.civilities)
			setCountries(data.countries)
		}
	}, [data])

	const nextPageHandler = (e) => {
		e.preventDefault()
		var ToDate = new Date();
		validationSchema.validate({
			civility,
			firstName,
			lastName,
			dob,
			number,
			email,
			nationality,
			street,
			no,
			zipCode,
			locality,
			country
		})
			.then(res => {
				if (!numberRegex.test(number)) {
					toast.warn('Please Enter a Valid Phone Number')
				}
				else if (new Date(dob).getTime() > ToDate.getTime()) {
					toast.warn('DoB should not be greater than current date')
				}
				else {
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
					localStorage.setItem('type', type == 'commercial' ? 'Commercial' : 'Private')
					navigate("/" + language + "/signup/new/guarantee")
				}
			})
			.catch(function (err) {
				toast.warn(err.message)
			});
	}

	const onSaveHandler = (e) => {
		e.preventDefault()
		validationSchema.validate({
			civility,
			firstName,
			lastName,
			dob,
			number,
			email,
			nationality,
			street,
			no,
			zipCode,
			locality,
			country
		})
			.then(async res => {
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
				localStorage.setItem('type', type == 'commercial' ? 'Commercial' : 'Private')
				navigate("/" + language + "/signup/confirmation")
			})
			.catch(function (err) {
				toast.warn(err.message)
			});
	}

	const validationSchema = yup.object({
		firstName: yup.string().required("First Name is Required").max(150, 'First Name Should be less than 150'),
		lastName: yup.string().required("Last Name is Required").max(150, 'Last Name Should be less than 150'),
		number: yup.string().required("Phone Number is Required").max(20, 'Phone Number Should be less than 20'),
		civility: yup.string().required("Civility is Required"),
		email: yup.string().email().required("Email is Required"),
		dob: yup.date().required("Birthday is Required"),
		country: yup.string().required("Country is Required").max(150, 'Country Should be less than 150'),
		zipCode: yup.string().required("Zipcode is Required").max(150, 'Zip Code Should be less than 150'),
		no: yup.string().required("House Number is Required").max(15, 'House Number Should be less than 15'),
		street: yup.string().required("Street Address is Required").max(150, 'Street Should be less than 150'),
		locality: yup.string().required("Locality is Required").max(150, 'Locality Should be less than 150'),
		nationality: yup.string().required("Nationality is Required").max(150, 'Nationality Should be less than 150'),
	});

	return (
		<div className='info-wrapper container'>
			<ContactBox />
			<Breadcrumbs level={2} content={content} />
			<Link to={`/${language}/signup`}><p className='previous-text'>&lt;  {content.previous} </p></Link>

			<div className='row'>
				<div className='col-sm-8 form-div mt-3'>
					<p className='form-text1'>{content.info_head1}</p>

					<form>
						<div className="form-group mt-4">
							<label htmlFor="civility" className='form-label'>{content.civility}</label>
							<select value={civility} className="form-control" id="civility" onChange={(e => setCivility(e.target.value))}>
								{civilities.map((civility) => <option value={civility.value} key={civility.value}>{civility.label}</option>
								)}
							</select>
						</div>
						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="firstname" className='form-label'>{content.first_name}</label>
								<input value={firstName} type="text" className="form-control" id="firstname" onChange={(e => setFirstName(e.target.value))} required />
							</div>
							<div className="form-group col-6">
								<label htmlFor="lastname" className='form-label'>{content.last_name}</label>
								<input value={lastName} type="text" className="form-control" id="lastname" onChange={(e => setLastName(e.target.value))} required />
							</div>
						</div>
						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="dob" className='form-label'>{content.date_of_birth}</label>
								<input value={dob} type="date" className="form-control" id="dob" onChange={(e => setDob(e.target.value))} required />
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
								<input value={street} type="text" className="form-control" id="street" onChange={(e => setStreet(e.target.value))} required />
							</div>
							<div className="form-group col-4">
								<label htmlFor="number" className='form-label'>{content.no}</label>
								<input value={no} type="number" className="form-control" id="number" onChange={(e => setNo(e.target.value))} />
							</div>
						</div>

						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="zip" className='form-label'>{content.zip_code}</label>
								<input value={zipCode} type="text" className="form-control" maxLength={4} id="zip" onChange={(e => setZipCode(e.target.value))} required />
							</div>
							<div className="form-group col-6">
								<label htmlFor="locality" className='form-label'>{content.locality}</label>
								<input value={locality} type="text" className="form-control" id="locality" onChange={(e => setLocality(e.target.value))} required />
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
							<input value={email} type="email" className="form-control" id="email" onChange={(e => setEmail(e.target.value))} required />
						</div>
						{
							status == 'new' ?
								<div className='row d-flex justify-content-center mt-4'>
									<button onClick={nextPageHandler} className='btn next-btn'>NEXT</button>
								</div> :
								status == 'edit' ?
									<div className='row d-flex justify-content-center mt-4'>
										<button onClick={onSaveHandler} className='btn save-btn'>SAVE</button>
									</div> :
									<></>
						}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Information