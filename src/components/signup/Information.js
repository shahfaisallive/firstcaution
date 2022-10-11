import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ContactBox from '../ContactBox';
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from 'react-places-autocomplete';

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

	useEffect(() => {
		changeLanguage(langParam)
		// console.log("1", language)
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
		// console.log("2", language)
		// console.log(data)
		if (data) {
			setCivilities(data.civilities)
			setCountries(data.countries)
		}
	}, [data])

	const [civility, setCivility] = useState("Mr")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [dob, setDob] = useState("")
	const [number, setNumber] = useState("")
	const [email, setEmail] = useState("")
	const [nationality, setNationality] = useState("CH")
	const [street, setStreet] = useState("")
	const [no, setNo] = useState("")
	const [zipCode, setZipCode] = useState("")
	const [locality, setLocality] = useState("")
	const [country, setCountry] = useState("CH")

	const [googleAddress, setGoogleAddresses] = useState([])

	const [validationArr, setValidationArr] = useState([
		{
			type: 'First Name',
			status: false,
			msg: "yO"
		}
		,
		{
			type: 'Last Name',
			status: false,
			msg: ""
		}
		,
		{
			type: 'DoB',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Street',
			status: false,
			msg: ""
		}
		,
		{
			type: 'No',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Zip Code',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Locality',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Email',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Country',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Nationality',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Civility',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Number',
			status: false,
			msg: ""
		}
	])

	const updateValidationArr = (state, status, message, type) => {
		// 👇️ passing function to setData method
		setValidationArr(prevState => {
			const newState = prevState.map(obj => {
				if (obj.type === type) {
					// console.log(state, 'here')
					return { ...obj, msg: message, status: status };
				}
				return obj;
			});

			return newState;
		});
	};

	const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

	let numberRegex = /^\+[1-9]\d{10,14}$/

	const textValidation = (state, type) => {
		// console.log(state,type)
		if (state.length <= 0) {
			updateValidationArr(state, true, `${type} is Required`, type)
			return false
		}
		else if (state.length > 20) {
			updateValidationArr(state, true, `${type} should not be greater than 20`, type)
			return false
		}
		updateValidationArr(state, false, '', type)
		return true
	}

	const numberValidation = () => {
		if (number.length <= 0) {
			updateValidationArr(number, true, 'Phone Number is Required', 'Number')
			return false
		}
		else if (!numberRegex.test(number)) {
			updateValidationArr(number, true, 'Phone Number is Invalid', 'Number')
			return false
		}
		updateValidationArr(number, false, '', "Number")
		return true
	}

	const dobValidation = () => {
		var ToDate = new Date();
		// console.log(dob, 'dob')
		if (dob.length <= 0) {
			updateValidationArr(dob, true, 'DoB is Required', 'DoB')
			return false
		}
		if (new Date(dob).getTime() > ToDate.getTime()) {
			updateValidationArr(dob, true, 'DoB Should be greater than current Date', 'DoB')
			return false
		}
		updateValidationArr(dob, false, '', 'DoB')
		return true
	}

	const emailValidation = () => {
		let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (!emailRegex.test(email)) {
			updateValidationArr(email, true, 'Email is Invalid', 'Email')
			return false
		}
		updateValidationArr(email, false, '', "Email")
		return true

	}

	const streetNoValidation = () => {
		if (no <= 0) {
			updateValidationArr(no, true, 'Street Number is Required', 'No')
			return false
		}
		else if(!/^\d+$/.test(no)){
			updateValidationArr(no, true, 'Street Number Can Only be Numeric', 'No')
		}
		updateValidationArr(no, false, '', 'No')
		return true
	}

	const zipCodeValidation = () => {
		if (zipCode <= 0) {
			updateValidationArr(zipCode, true, 'Zip Code is Required', 'Zip Code')
			return false
		}
		else if(!/^\d+$/.test(zipCode )){
			updateValidationArr(zipCode , true, 'Zip Code Can Only be Numeric', 'Zip Code')
			return false
		}
		updateValidationArr(zipCode, false, '', 'Zip Code')
		return true
	}

	const streetValidation = () => {
		if (street.length <= 0) {
			updateValidationArr(street, true, 'Street is Required', 'Street')
			return false
		}
		else if(!/^[a-zA-Z]+$/.test(street)){
			updateValidationArr(street , true, 'Street can Only have Alphabets', 'Street')
			return false
		}
		updateValidationArr(street, false, '', 'Street')
		return true
	}

	const nextPageHandler = (e) => {
		e.preventDefault()
		if (textValidation(firstName, 'First Name') &
			textValidation(lastName, 'Last Name') &
			textValidation(country, 'Country') &
			textValidation(locality, 'Locality') &
			textValidation(nationality, 'Nationality') &
			textValidation(civility, 'Civility') &
			numberValidation() &
			streetNoValidation() &
			dobValidation() &
			emailValidation() &
			zipCodeValidation() &
			streetValidation()) {
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
	}

	const onSaveHandler = (e) => {
		e.preventDefault()
		if (textValidation(firstName, 'First Name') &
			textValidation(lastName, 'Last Name') &
			textValidation(country, 'Country') &
			textValidation(zipCode, 'Zip Code') &
			textValidation(street, 'Street') &
			textValidation(locality, 'Locality') &
			textValidation(nationality, 'Nationality') &
			textValidation(civility, 'Civility') &
			numberValidation() &
			streetNoValidation() &
			dobValidation() &
			emailValidation()) {
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
		}
	}

	return (
		<div className='info-wrapper container'>
			<ContactBox />
			<Breadcrumbs level={2} content={content} />
			{
				status == 'new' &&
				<Link to={`/${language}/signup`}><p className='previous-text'>&lt;  {content.previous} </p></Link>
			}
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
							<div id="emailHelp" className={validationArr[10].status ? 'form-text helper-text' : 'd-none'}>{validationArr[10].msg}</div>
						</div>
						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="firstname" className='form-label'>{content.first_name}</label>
								<input value={firstName} type="text" className="form-control" id="firstname" onChange={(e => setFirstName(e.target.value))} required />
								<div id="emailHelp" className={validationArr[0].status ? 'form-text helper-text' : 'd-none'}>{validationArr[0].msg}</div>
							</div>
							<div className="form-group col-6">
								<label htmlFor="lastname" className='form-label'>{content.last_name}</label>
								<input value={lastName} type="text" className="form-control" id="lastname" onChange={(e => setLastName(e.target.value))} required />
								<div id="emailHelp" className={validationArr[1].status ? 'form-text helper-text' : 'd-none'}>{validationArr[1].msg}</div>
							</div>
						</div>
						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="dob" className='form-label'>{content.date_of_birth}</label>
								<input value={dob} type="date" className="form-control" id="dob" onChange={(e => setDob(e.target.value))} required />
								<div id="emailHelp" className={validationArr[2].status ? 'form-text helper-text' : 'd-none'}>{validationArr[2].msg}</div>
							</div>
							<div className="form-group col-6">
								<label htmlFor="nationality" className='form-label'>{content.nationality}</label>
								<select defaultValue='CH' required className="form-control" id="nationality" onChange={(e => setNationality(e.target.value))}>
									{countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>
									)}
								</select>
								<div id="emailHelp" className={validationArr[9].status ? 'form-text helper-text' : 'd-none'}>{validationArr[9].msg}</div>
							</div>
						</div>

						<p className='form-text1 mt-5'>{content.info_head2}</p>

						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="street" className='form-label' >{content.street}</label>
								<input value={street} type="text" className="form-control" id="street" onChange={(e => setStreet(e.target.value))} required />
								<div id="emailHelp" className={validationArr[3].status ? 'form-text helper-text' : 'd-none'}>{validationArr[3].msg}</div>
							</div>
							<div className="form-group col-6">
								<label htmlFor="number" className='form-label'>{content.no}</label>
								<input value={no} type="number" className="form-control" id="number" onChange={(e => setNo(e.target.value))} />
								<div id="emailHelp" className={validationArr[4].status ? 'form-text helper-text' : 'd-none'}>{validationArr[4].msg}</div>
							</div>
						</div>

						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="zip" className='form-label'>{content.zip_code}</label>
								<input value={zipCode} type="text" className="form-control" maxLength={4} id="zip" onChange={(e => setZipCode(e.target.value))} required />
								<div id="emailHelp" className={validationArr[5].status ? 'form-text helper-text' : 'd-none'}>{validationArr[5].msg}</div>
							</div>
							<div className="form-group col-6">
								<label htmlFor="locality" className='form-label'>{content.locality}</label>
								<input value={locality} type="text" className="form-control" id="locality" onChange={(e => setLocality(e.target.value))} required />
								<div id="emailHelp" className={validationArr[6].status ? 'form-text helper-text' : 'd-none'}>{validationArr[6].msg}</div>
							</div>
						</div>

						<div className="form-group mt-1">
							<label htmlFor="country" className='form-label'>{content.country}</label>
							<select defaultValue='CH' className="form-control" id="country" onChange={(e => setCountry(e.target.value))} required>
								{countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>
								)}
							</select>
							<div id="emailHelp" className={validationArr[8].status ? 'form-text helper-text' : 'd-none'}>{validationArr[8].msg}</div>
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
								<div id="emailHelp" className={validationArr[11].status ? 'form-text helper-text' : 'd-none'}>{validationArr[11].msg}</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="email" className='form-label'>{content.email}</label>
							<input value={email} type="email" className="form-control" id="email" onChange={(e => setEmail(e.target.value))} required />
							<div id="emailHelp" className={validationArr[7].status ? 'form-text helper-text' : 'd-none'}>{validationArr[7].msg}</div>
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