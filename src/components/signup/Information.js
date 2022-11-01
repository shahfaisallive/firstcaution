import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ContactBox from '../ContactBox';
import PlacesAutocomplete from 'react-places-autocomplete';

const Information = ({ setFormData, language, data, content, changeLanguage }) => {

	const urlParams = new URLSearchParams(window.location.search)

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
		let utmSource = urlParams.get('utm_source')
		let utmCompaign = urlParams.get('utm_campaign')
		let utmMedium = urlParams.get('utm_medium')
		if (utmSource || utmCompaign || utmMedium) {
			localStorage.setItem('utmSource', utmSource);
			localStorage.setItem('utmCompaign', utmCompaign);
			localStorage.setItem('utmMedium', utmMedium);
		}
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
			setGoogleAddresses(localStorage.getItem("street"))
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
	const [isTyping, setIsTyping] = useState(false)
	const [googleAddress, setGoogleAddresses] = useState('')

	useEffect(() => {
		if (number != undefined) {
			numberValidation()
		}
	}, [number])

	const [validationArr, setValidationArr] = useState([
		{
			type: 'First Name',
			status: false,
			msg: ""
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

	const validateFirstName = (e) => {
		setFirstName(e.target.value)
		textValidation(e.target.value, 'First Name', content.first_name)
	}

	const validateLastName = (e) => {
		setLastName(e.target.value)
		textValidation(e.target.value, 'Last Name', content.last_name)
	}

	const validateDob = (e) => {
		setDob(e.target.value)
		dobValidation(e.target.value)
	}

	const validateNo = (e) => {
		setNo(e.target.value)
		streetNoValidation(e.target.value)
	}

	const validateZipCode = (e) => {
		setZipCode(e.target.value)
		textValidation(e.target.value, 'Zip Code', content.zip_code)
	}

	const updateValidationArr = (state, status, message, type) => {
		setValidationArr(prevState => {
			const newState = prevState.map(obj => {
				if (obj.type === type) {
					return { ...obj, msg: message, status: status };
				}
				return obj;
			});

			return newState;
		});
	};

	let numberRegex = /^\+[1-9]\d{10,14}$/

	const textValidation = (state, type, name) => {
		// console.log(state,type)
		if (state.length <= 0) {
			updateValidationArr(state, true, `${name} ${content.is_required_err}`, type)
			return false
		}
		else if (state.length > 20) {
			updateValidationArr(state, true, `${name} ${content.limit_err}`, type)
			return false
		}
		updateValidationArr(state, false, '', type)
		return true
	}

	const numberValidation = (state) => {
		if (number != undefined && number.length <= 0 && isTyping) {
			setIsTyping(false)
			updateValidationArr(number, true, `${content.number} ${content.is_required_err}`, 'Number')
			return false
		}
		else if (!numberRegex.test(number) && isTyping) {
			updateValidationArr(number, true, `Phone Number ${content.is_invalid_err}`, 'Number')
			return false
		}
		updateValidationArr(number, false, '', "Number")
		setIsTyping(true)
		return true
	}

	const dobValidation = (state) => {
		var ToDate = new Date();
		// console.log(dob, 'dob')
		if (state.length <= 0) {
			updateValidationArr(dob, true, `${content.date_of_birth} ${content.is_required_err}`, 'DoB')
			return false
		}
		if (new Date(state).getTime() > ToDate.getTime()) {
			updateValidationArr(dob, true, content.dob_err, 'DoB')
			return false
		}
		updateValidationArr(dob, false, '', 'DoB')
		return true
	}

	const emailValidation = (state) => {
		// console.log(state,'dasdas')
		setEmail(state)
		let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (!emailRegex.test(state)) {
			updateValidationArr(email, true, `${content.email} ${content.is_invalid_err}`, 'Email')
			return false
		}
		updateValidationArr(email, false, '', "Email")
		return true
	}

	const streetNoValidation = (state) => {
		if (state <= 0) {
			updateValidationArr(no, true, `${content.no} ${content.is_required_err}`, 'No')
			return false
		}
		else if (!/^\d+$/.test(state)) {
			updateValidationArr(no, true, `${content.no} ${content.only_numeric}`, 'No')
		}
		updateValidationArr(no, false, '', 'No')
		return true
	}

	const zipCodeValidation = (state) => {
		if (state <= 0) {
			updateValidationArr(zipCode, true, `${content.zip_code} ${content.is_required_err}`, 'Zip Code')
			return false
		}
		else if (!/^[a-zA-Z0-9_ ]*$/.test(state)) {
			updateValidationArr(zipCode, true, `${content.zip_code} ${content.only_numeric}`, 'Zip Code')
			return false
		}
		updateValidationArr(zipCode, false, '', 'Zip Code')
		return true
	}

	const streetValidation = (state) => {
		// console.log(state, 'dasdasdastate')
		setGoogleAddresses(state)
		if (state.length <= 0) {
			updateValidationArr(street, true, `${content.street} ${content.is_required_err}`, 'Street')
			return false
		}
		else if (!/^[a-zA-Z_àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ ]+$/.test(state)) {
			updateValidationArr(street, true, `${content.street} ${content.only_alphabet}`, 'Street')
			return false
		}
		updateValidationArr(street, false, '', 'Street')
		return true
	}

	const localityValidation = (e) => {
		setLocality(e.target.value)
		textValidation(e.target.value, 'Locality', content.locality)
	}

	const nextPageHandler = (e) => {
		e.preventDefault()
		if (textValidation(firstName, 'First Name', content.first_name) &
			textValidation(lastName, 'Last Name', content.last_name) &
			textValidation(country, 'Country', content.country) &
			textValidation(locality, 'Locality', content.locality) &
			textValidation(nationality, 'Nationality', content.nationality) &
			textValidation(civility, 'Civility', content.civility) &
			numberValidation(number) &
			streetNoValidation(no) &
			dobValidation(dob) &
			emailValidation(email) &
			zipCodeValidation(zipCode) &
			streetValidation(googleAddress)) {
			localStorage.setItem('civility', civility);
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
			localStorage.setItem('dob', dob);
			localStorage.setItem('nationality', nationality);
			localStorage.setItem('street', googleAddress);
			localStorage.setItem('no', no);
			localStorage.setItem('zipCode', zipCode);
			localStorage.setItem('locality', locality);
			localStorage.setItem('country', country);
			localStorage.setItem('number', number);
			localStorage.setItem('email', email);
			localStorage.setItem('type', type == 'commercial' ? 'commercial' : 'residential')
			navigate("/" + language + "/signup/new/guarantee/" + type)
		}
	}

	const onSaveHandler = (e) => {
		e.preventDefault()
		if (textValidation(firstName, 'First Name') &
			textValidation(lastName, 'Last Name') &
			textValidation(country, 'Country') &
			textValidation(zipCode, 'Zip Code') &
			textValidation(locality, 'Locality') &
			textValidation(nationality, 'Nationality') &
			textValidation(civility, 'Civility') &
			numberValidation(number) &
			streetNoValidation(no) &
			dobValidation(dob) &
			emailValidation(email) &
			streetValidation(googleAddress)) {
			localStorage.setItem('civility', civility);
			localStorage.setItem('civility', civility);
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
			localStorage.setItem('dob', dob);
			localStorage.setItem('nationality', nationality);
			localStorage.setItem('street', googleAddress);
			localStorage.setItem('no', no);
			localStorage.setItem('zipCode', zipCode);
			localStorage.setItem('locality', locality);
			localStorage.setItem('country', country);
			localStorage.setItem('number', number);
			localStorage.setItem('email', email);
			localStorage.setItem('type', type == 'commercial' ? 'commercial' : 'residential')
			navigate("/" + language + "/signup/confirmation/" + type)
		}
	}

	const handleChange = (address, x, y) => {
		streetValidation(address)
	};

	const handleSelect = (address, x, y) => {
		// console.log(y.formattedSuggestion.mainText,'text')
		setGoogleAddresses(y.formattedSuggestion.mainText)
		setLocality("")
		setZipCode("")
		setNo("")
		if (window.google) {
			const PlacesService = new window.google.maps.places.PlacesService(document.getElementById('map'));
			try {
				PlacesService.getDetails(
					{
						placeId: y.placeId,
						fields: ['address_components'],
					},
					(place, status) => {
						for (const component of place.address_components) {
							// @ts-ignore remove once typings fixed
							const componentType = component.types[0];
							// console.log(componentType,'tuoeqweqwe')

							switch (componentType) {
								case "street_number": {
									setNo(component.long_name)
									break;
								}
								case "street_address": {
									// console.log(component.long_name,'std')
									// streetValidation(component.long_name)
									break;
								}

								case "route": {
									// console.log(component.long_name,'roue')
									// setGoogleAddresses(component.long_name)
									streetValidation(component.long_name)
									break;
								}

								case "postal_code": {
									setZipCode(component.long_name)
									break;
								}

								case "postal_code_suffix": {
									// console.log(component.long_name)
									break;
								}

								case "locality":
									// console.log(component.long_name,'LONG')
									setLocality(component.long_name)
									break;

								case "administrative_area_level_1": {
									// console.log(component.long_name,'level 1')
									break;
								}

								case "country":
									setCountry(component.short_name)
									break;
							}
						}

					}
				);
			} catch (e) {
				console.error(e);
			}
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
						<div id='map'></div>
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
								<input value={firstName} type="text" className="form-control" id="firstname" onChange={(e => validateFirstName(e))} required />
								<div id="emailHelp" className={validationArr[0].status ? 'form-text helper-text' : 'd-none'}>{validationArr[0].msg}</div>
							</div>
							<div className="form-group col-6">
								<label htmlFor="lastname" className='form-label'>{content.last_name}</label>
								<input value={lastName} type="text" className="form-control" id="lastname" onChange={(e => validateLastName(e))} required />
								<div id="emailHelp" className={validationArr[1].status ? 'form-text helper-text' : 'd-none'}>{validationArr[1].msg}</div>
							</div>
						</div>
						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="dob" className='form-label'>{content.date_of_birth}</label>
								<input value={dob} type="date" className="form-control" id="dob" onChange={(e => validateDob(e))} required />
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
								<PlacesAutocomplete
									value={googleAddress}
									onChange={handleChange}
									onSelect={handleSelect}
								>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
										<div>
											<input
												{...getInputProps({
													placeholder: '',
													className: "form-control",
													id: "street"
												})}
											/>
											<div style={suggestions.length > 0 ? { border: '2px solid grey' } : {}} className="autocomplete-dropdown-container">
												{loading && <div>searching...</div>}
												{suggestions.map(suggestion => {
													const className = suggestion.active
														? 'suggestion-item--active'
														: 'suggestion-item';
													// inline style for demonstration purpose
													const style = suggestion.active
														? { backgroundColor: '#fafafa', cursor: 'pointer', border: '2px solid grey' }
														: { backgroundColor: '#ffffff', cursor: 'pointer' };
													return (
														<div
															{...getSuggestionItemProps(suggestion, {
																className,
																style,
															})}
														>
															<span>{suggestion.description}</span>
														</div>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
								{/* <input value={street} type="text" className="form-control" id="street" onChange={(e => streetValidation(e.target.value))} required /> */}
								<div id="emailHelp" className={validationArr[3].status ? 'form-text helper-text' : 'd-none'}>{validationArr[3].msg}</div>
							</div>
							<div className="form-group col-6">
								<label htmlFor="number" className='form-label'>{content.no}</label>
								<input value={no} type="number" className="form-control" id="number" onChange={(e => validateNo(e))} />
								<div id="emailHelp" className={validationArr[4].status ? 'form-text helper-text' : 'd-none'}>{validationArr[4].msg}</div>
							</div>
						</div>

						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="zip" className='form-label'>{content.zip_code}</label>
								<input value={zipCode} type="text" className="form-control" maxLength={4} id="zip" onChange={(e => validateZipCode(e))} required />
								<div id="emailHelp" className={validationArr[5].status ? 'form-text helper-text' : 'd-none'}>{validationArr[5].msg}</div>
							</div>
							<div className="form-group col-6">
								<label htmlFor="locality" className='form-label'>{content.locality}</label>
								<input value={locality} type="text" className="form-control" id="locality" onChange={(e => localityValidation(e))} required />
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
							<input value={email} type="email" className="form-control" id="email" onChange={(e => emailValidation(e.target.value))} required />
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