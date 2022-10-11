import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { ReactComponent as UploadIcon } from "../../media/upload-icon.svg";
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ContactBox from '../ContactBox';
import * as yup from "yup";
import { toast } from 'react-toastify'

const Guarantee = ({ language, content }) => {
	const navigate = useNavigate()
	const params = useParams()
	const { status } = params
	// Form Input states
	const [data, setData] = useState()
	const [guaranteeStreet, setGuaranteeStreet] = useState("")
	const [guaranteeNo, setGuaranteeNo] = useState("")
	const [guaranteeZipCode, setGuaranteeZipCode] = useState("")
	const [guaranteeLocality, setGuaranteeLocality] = useState("")
	const [guaranteeAmount, setGuaranteeAmount] = useState("")
	const [moveInDate, setMoveInDate] = useState("")
	const [promoCode, setPromoCode] = useState("")
	const [leaseFile, setLeaseFile] = useState("")
	const [IdFile, setIdFile] = useState("")
	const [leaseFileName, setLeaseFileName] = useState("")
	const [IdFileName, setIdFileName] = useState("")
	const [type, setType] = useState("")

	// Tenant States
	const [tenants, setTenants] = useState([])
	const [tenantsDocs, setTenantsDocs] = useState([])
	const [tNum, setTNum] = useState()
	const [indexForTNum, setIndexForTNum] = useState()

	const [tenantsValidationArr, setTenantsValidationArr] = useState([])

	const [validationArr, setValidationArr] = useState([
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
			type: 'Amount',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Move In Date',
			status: false,
			msg: ""
		}
		,
		{
			type: 'Lease File',
			status: false,
			msg: ""
		}
		,
		{
			type: 'ID File',
			status: false,
			msg: ""
		}
	])

	useEffect(() => {
		if (!data) {
			setData(JSON.parse(localStorage.getItem("data")))
		}
	}, [])

	useEffect(() => {
		setType(localStorage.getItem("type"))
		if (status == 'edit') {
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
			const tenantsArray = JSON.parse(localStorage.getItem("tenants"))
			// console.log(tenantsArray, 'asasdasdas')
			let allTenants = tenantsArray.map((obj) => {
				let myKey = Object.values(obj)
				return {
					last_name: myKey[3],
					birthday: myKey[4],
					nationality_id: myKey[5],
					role_id: "1",
					civility_id: myKey[1],
					first_name: myKey[2],
					number: myKey[9],
					email: myKey[6]
				}
			})
			// console.log(allTenants,'dasdas')
			setTenants(tenantsArray)
		}
	}, [status])

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

	const handleChange = (index, column, type, message, status) => {
		let copy = [...tenantsValidationArr];
		if (copy.length >= index) {
			if (copy[index][column].type == type) {
				copy[index][column].msg = message
				copy[index][column].status = status
			}
		}
		setTenantsValidationArr(copy);
	};

	const updateTenantValidationArr = () => {
		// console.log(tenants)
		if (tenants.length == 0) {
			return true
		}
		else {
			let flag = false
			tenants.map((item, index) => {
				flag = textValidationTenant(item.t_civility, index, 1, 'Civility') &
					textValidationTenant(item.t_firstName, index, 2, 'First Name') &
					textValidationTenant(item.t_lastName, index, 3, 'Last Name') &
					dobTenantValidation(item.t_dob, index, 4, 'DoB') &
					textValidationTenant(item.t_nationality, index, 5, 'Nationality') &
					validateFilesTenant(item.t_docFile, index, 7, 'Doc File') &
					validateEmailTenant(item.t_email, index, 6, 'Email') &
					numberValidationTenant(tNum, index, 8, 'Mobile')
			})
			return flag
		}
	};

	const numberValidationTenant = (state, index, column, type) => {
		let numberRegex = /^\+[1-9]\d{10,14}$/
		if (state <= 0) {
			handleChange(index, column, type, `${type} is Required`, true)
			return false
		}
		else if (!numberRegex.test(state)) {
			handleChange(index, column, type, `${type} is Invalid`, true)
			return false
		}
		handleChange(index, column, type, '', false)
		return true
	}

	const dobTenantValidation = (state, index, column, type) => {
		var ToDate = new Date();
		// console.log(dob, 'dob')
		if (state <= 0) {
			handleChange(index, column, type, `${type} is Required`, true)
			return false
		}
		if (new Date(state).getTime() > ToDate.getTime()) {
			handleChange(index, column, type, `${type} cannot be greater than Current date`, true)
			return false
		}
		handleChange(index, column, type, '', false)
		return true
	}

	const textValidationTenant = (state, index, column, type) => {
		if (state.length <= 0) {
			handleChange(index, column, type, `${type} is Required`, true)
			return false
		}
		else if (state.length > 20) {
			handleChange(index, column, type, `${type} should be less than 20 chars `, true)
			return false
		}
		handleChange(index, column, type, '', false)
		return true
	}

	const validateEmailTenant = (state, index, column, type) => {
		let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (state.length <= 0) {
			handleChange(index, column, type, 'Email is Required', true)
			return false
		}
		else if (!emailRegex.test(state)) {
			handleChange(index, column, type, 'Email is Invalid', true)
			return false
		}
		handleChange(index, column, type, '', false)
		return true
	}

	const addNewTenant = () => {
		let data = [...tenants];
		// if (data.some(i => i.t_firstName === "" || i.t_lastName === "" || i.t_type === "" || i.t_civility === "" || i.t_dob === "" || i.t_nationality === "" || i.t_mobile === "" || i.t_number === "" || i.t_email === "")) {
		//     alert("please fill out the data")
		// } else {
		let newTenant = {
			t_type: "Tenant",
			t_civility: "Mr.",
			t_firstName: "",
			t_lastName: "",
			t_dob: "",
			t_nationality: "CH",
			t_mobile: 0,
			t_number: 0,
			t_email: "",
			t_docName: null,
			t_docFile: ""
		}
		setTenants([...tenants, newTenant])

		let newTenantValidation = [
			{
				type: 'Type',
				status: false,
				msg: ""
			},
			{
				type: 'Civility',
				status: false,
				msg: ""
			},
			{
				type: 'First Name',
				status: false,
				msg: ""
			},
			{
				type: 'Last Name',
				status: false,
				msg: ""
			},
			{
				type: 'DoB',
				status: false,
				msg: ""
			},
			{
				type: 'Nationality',
				status: false,
				msg: ""
			},
			{
				type: 'Email',
				status: false,
				msg: ""
			},
			{
				type: 'Doc File',
				status: false,
				msg: ""
			},
			{
				type: 'Mobile',
				status: false,
				msg: ""
			},

		]
		setTenantsValidationArr([...tenantsValidationArr, newTenantValidation])
	}

	const validateLeaseFile = () => {
		if (!leaseFile) {
			updateValidationArr(leaseFile, true, 'Lease is Required', 'Lease File')
			return false
		}
		updateValidationArr(leaseFile, false, '', 'Lease File')
		return true
	}

	const validateIdFile = () => {
		if (!IdFile) {
			updateValidationArr(IdFile, true, 'ID File is Required', 'ID File')
			return false
		}
		updateValidationArr(IdFile, false, '', 'ID File')
		return true
	}

	const validateFilesTenant = (state, index, column, type) => {
		if (!state) {
			handleChange(index, column, type, `${type} is Required`, true)
			return false
		}
		handleChange(index, column, type, '', false)
		return true
	}

	const streetNoValidation = () => {
		if(!/^\d+$/.test(guaranteeNo )){
			updateValidationArr(guaranteeNo , true, 'Street Number Can Only be Numeric', 'No')
		}
		else if (guaranteeNo <= 0) {
			updateValidationArr(guaranteeNo, true, 'Street Number is Required', 'No')
			return false
		}
		updateValidationArr(guaranteeNo, false, '', 'No')
		return true
	}

	const zipCodeValidation = () => {
		if(!/^\d+$/.test(guaranteeZipCode )){
			updateValidationArr(guaranteeZipCode , true, 'Zip Code Can Only be Numeric', 'Zip Code')
			return false
		}
		else if (guaranteeZipCode <= 0) {
			updateValidationArr(guaranteeZipCode, true, 'Zip Code is Required', 'Zip Code')
			return false
		}
		updateValidationArr(guaranteeZipCode, false, '', 'Zip Code')
		return true
	}

	const amountValidation = () => {
		if (guaranteeAmount <= 0) {
			updateValidationArr(guaranteeAmount, true, 'Amount is Required', 'Amount')
			return false
		}
		updateValidationArr(guaranteeAmount, false, '', 'Amount')
		return true
	}

	const streetValidation = () => {
		if (guaranteeStreet.length <= 0) {
			updateValidationArr(guaranteeStreet, true, 'Street is Required', 'Street')
			return false
		}
		else if(!/^[a-zA-Z]+$/.test(guaranteeStreet)){
			updateValidationArr(guaranteeStreet , true, 'Street can Only have Alphabets', 'Street')
			return false
		}
		updateValidationArr(guaranteeStreet, false, '', 'Street')
		return true
	}

	const moveInDateValidation = () => {
		var ToDate = new Date();
		if (moveInDate.length == 0) {
			updateValidationArr(moveInDate, true, 'Move In Date is Required', 'Move In Date')
			return false
		}
		else if (new Date(moveInDate).getTime() <= ToDate.getTime()) {
			updateValidationArr(moveInDate, true, 'Move In Date should be greater than current date', 'Move In Date')
			return false
		}
		updateValidationArr(moveInDate, false, '', 'Move In Date')
		return true
	}

	const nextPageHandler = (e) => {
		e.preventDefault()
		if (
			textValidation(guaranteeLocality, 'Locality') &
			streetNoValidation() &
			amountValidation() &
			moveInDateValidation() &
			validateLeaseFile() &
			validateIdFile() &
			updateTenantValidationArr() &
			zipCodeValidation() &
			streetValidation()) {
			localStorage.setItem('guaranteeStreet', guaranteeStreet);
			localStorage.setItem('guaranteeNo', guaranteeNo);
			localStorage.setItem('guaranteeZipCode', guaranteeZipCode);
			localStorage.setItem('guaranteeLocality', guaranteeLocality);
			localStorage.setItem('guaranteeAmount', guaranteeAmount);
			localStorage.setItem('moveInDate', moveInDate);
			localStorage.setItem('promoCode', promoCode);
			localStorage.setItem('leaseFile', leaseFile);
			localStorage.setItem('IdFile', IdFile);
			localStorage.setItem('leaseFileName', leaseFileName);
			localStorage.setItem('IdFileName', IdFileName);
			localStorage.setItem('tenants', JSON.stringify(tenants));
			navigate('/' + language + '/signup/confirmation')
		}
	}

	const getBase64 = async (file) => {
		return new Promise(resolve => {
			let fileInfo;
			let baseURL = "";
			let reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = () => {
				baseURL = reader.result;
				// console.log(baseURL);
				resolve(baseURL);
			};
		});
	};

	const onIDFileChange = async (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setIdFileName(file.name)
			// console.log(e.target.files[0].size)
			const base64 = await getBase64(file)
			const newBase64 = base64.split(",")
			setIdFile(newBase64[1])
			// console.log(base64)

		}
	}

	const onLeaseFileChange = async (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setLeaseFileName(file.name)
			// console.log(e.target.files[0].size)
			const base64 = await getBase64(file)
			const newBase64 = base64.split(",")
			setLeaseFile(newBase64[1])
			// console.log(newBase64[1])

		}
	}

	const handleFormChange = (index, e) => {
		let data = [...tenants];
		data[index][e.target.name] = e.target.value;
		setTenants(data);
		// console.log(tenants)
	}

	const onDocFileChange = async (index, e) => {
		let data = [...tenants];
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setTenantsDocs([...tenantsDocs, file.name])
			data[index]['t_docName'] = file.name
			const base64 = await getBase64(file)
			data[index]['t_docFile'] = base64.slice(27)
			// console.log(tenants)
		}
	}

	const deleteTenant = (index) => {
		let data = [...tenants];
		data.splice(index, 1)
		setTenants(data)

		let validationData = [...tenantsValidationArr]
		validationData.splice(index, 1)
		setTenantsValidationArr(validationData)
	}

	return (
		<div className='info-wrapper container'>
			<ContactBox />
			<Breadcrumbs level={3} content={content} />
			{
				status == 'new' &&
				<Link to={`/${language}/signup/new/information/${type}`}><p className='previous-text'>&lt;  {content.previous} </p></Link>
			}

			<div className='row'>
				<div className='col-sm-8 form-div mt-3'>
					<form >
						<p className='form-text1'>{content.guar_head1}</p>

						<div className='row d-flex justify-content-start mt-4'>
							<div className="form-group col-8">
								<label htmlFor="street" className='form-label'>{content.street}</label>
								<input value={guaranteeStreet} type="text" className="form-control" id="street" onChange={(e => setGuaranteeStreet(e.target.value))} />
								<div id="emailHelp" className={validationArr[0].status ? 'form-text helper-text' : 'd-none'}>{validationArr[0].msg}</div>
							</div>
							<div className="form-group col-4">
								<label htmlFor="number" className='form-label'>{content.no}</label>
								<input value={guaranteeNo} type="number" className="form-control" id="number" onChange={(e => setGuaranteeNo(e.target.value))} />
								<div id="emailHelp" className={validationArr[1].status ? 'form-text helper-text' : 'd-none'}>{validationArr[1].msg}</div>
							</div>
						</div>

						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="zip" className='form-label'>{content.zip_code}</label>
								<input value={guaranteeZipCode} type="text" className="form-control" maxLength={4} id="zip" onChange={(e => setGuaranteeZipCode(e.target.value))} />
								<div id="emailHelp" className={validationArr[2].status ? 'form-text helper-text' : 'd-none'}>{validationArr[2].msg}</div>
							</div>
							<div className="form-group col-6">
								<label htmlFor="locality" className='form-label'>{content.locality}</label>
								<input value={guaranteeLocality} type="text" className="form-control" id="locality" onChange={(e => setGuaranteeLocality(e.target.value))} />
								<div id="emailHelp" className={validationArr[3].status ? 'form-text helper-text' : 'd-none'}>{validationArr[3].msg}</div>
							</div>
						</div>
						<p className='form-text1 mt-5'>{content.guar_head2}</p>
						<div className="form-group">
							<label htmlFor="guaranteeAmount" className='form-label'>{content.amount_in_guarantee}</label>
							<input value={guaranteeAmount} type="number" className="form-control" id="guaranteeAmount" onChange={(e => setGuaranteeAmount(e.target.value))} />
							<div id="emailHelp" className={validationArr[4].status ? 'form-text helper-text' : 'd-none'}>{validationArr[4].msg}</div>
						</div>

						<div className="form-group mt-1">
							<label htmlFor="moveDate" className='form-label'>{content.mone_in_date}</label>
							<input value={moveInDate} type="date" className="form-control" id="moveDate" onChange={(e => setMoveInDate(e.target.value))} />
							<div id="emailHelp" className={validationArr[5].status ? 'form-text helper-text' : 'd-none'}>{validationArr[5].msg}</div>
						</div>

						<div className="form-group mt-1 mb-5">
							<label htmlFor="guaranteeAmount" className='form-label'>{content.promo_code}</label>
							<input value={promoCode} type="text" className="form-control" id="guaranteeAmount" onChange={(e => setPromoCode(e.target.value))} />
							<label className='form-label'>{content.promo_validated}</label>
						</div>

						{/* DOCUMENTS SECTIONS */}
						<p className='form-text1 mt-5'>{content.guar_head3}</p>
						<p className='form-text2'>{content.doc_subtext}</p>

						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<div className="upload-btn-wrapper">
									<button type='button' className="upload-btn text-left">{content.lease_btn}</button>
									<UploadIcon className='upload-icon' />
									<input type="file" className='upload-input' name="myfile" onChange={onLeaseFileChange} accept="image/jpg, image/jpeg, image/png, file_extension/pdf" />
								</div>
								{leaseFileName ? <p>{leaseFileName}</p> : <p>{content.no_file_selected}</p>}
								<div id="emailHelp" className={validationArr[6].status ? 'form-text helper-text' : 'd-none'}>{validationArr[6].msg}</div>
							</div>
							<div className="form-group col-6">
								<div className="upload-btn-wrapper">
									<button type='button' className="upload-btn text-left">{content.id_doc}</button>
									<UploadIcon className='upload-icon' />
									<input type="file" className='upload-input' name="myfile" onChange={onIDFileChange} accept="image/jpg, image/jpeg, image/png, file_extension/pdf" />
								</div>
								{IdFileName ? <p>{IdFileName}</p> : <p>{content.no_file_selected}</p>}
								<div id="emailHelp" className={validationArr[7].status ? 'form-text helper-text' : 'd-none'}>{validationArr[7].msg}</div>
							</div>
						</div>
						<p className='form-text1 mt-5'>{content.guar_head4}</p>
						{tenants.map((tenant, index) => {
							return (
								<div key={index}>
									<div className='row d-flex justify-content-start mt-5'>
										<div className="form-group col-6">
											<label htmlFor="type" className='form-label'>{content.type}</label>
											<select className="form-control" defaultValue={tenant.t_type || 'Tenant'} id="type" name='t_type' onChange={e => handleFormChange(index, e)}>
												<option value="Guarantor">Guarantor</option>
												<option value="Tenant">Tenant</option>
											</select>
										</div>
										<div className="form-group col-6">
											<label htmlFor="civility" className='form-label'>{content.civility}</label>
											<select className="form-control" id="civility" name='t_civility' defaultValue={'Mr.'} onChange={e => handleFormChange(index, e)}>
												{data.civilities.map((civility) => <option value={civility.value} key={civility.value}>{civility.label}</option>
												)}
											</select>
										</div>
									</div>

									<div className='row d-flex justify-content-start mt-1'>
										<div className="form-group col-6">
											<label htmlFor="firstname" className='form-label'>{content.first_name}</label>
											<input value={tenant.t_firstName} required type="text" className="form-control" id="type" name='t_firstName' onChange={e => handleFormChange(index, e)} />
											<div id="emailHelp" className={tenantsValidationArr[index][2].status ? 'form-text helper-text' : 'd-none'}>{tenantsValidationArr[index][2].msg}</div>

										</div>
										<div className="form-group col-6">
											<label htmlFor="lasttime" className='form-label'>{content.last_name}</label>
											<input value={tenant.t_lastName} required type="text" className="form-control" id="lasttime" name='t_lastName' onChange={e => handleFormChange(index, e)} />
											<div id="emailHelp" className={tenantsValidationArr[index][3].status ? 'form-text helper-text' : 'd-none'}>{tenantsValidationArr[index][3].msg}</div>

										</div>
									</div>

									<div className='row d-flex justify-content-start mt-1'>
										<div className="form-group col-6">
											<label htmlFor="dob" className='form-label'>{content.date_of_birth}</label>
											<input value={tenant.t_dob} type="date" className="form-control" id="dob" name='t_dob' onChange={e => handleFormChange(index, e)} />
											<div id="emailHelp" className={tenantsValidationArr[index][4].status ? 'form-text helper-text' : 'd-none'}>{tenantsValidationArr[index][4].msg}</div>

										</div>
										<div className="form-group col-6">
											<label htmlFor="nationality" className='form-label'>{content.nationality}</label>
											<select className="form-control" defaultValue={tenant.nationality_id} id="nationality" name='t_nationality' onChange={e => handleFormChange(index, e)}>
												{data.countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>
												)}
											</select>
										</div>
									</div>

									<div className='row d-flex justify-content-start mt-1'>
										<div className="form-group col-12">
											<label htmlFor="num" className='form-label'>{content.number}</label>
											<PhoneInput
												placeholder="Enter phone number"
												value={tNum}
												onChange={setTNum} className="phone-input-field" onFocus={() => setIndexForTNum(index)}
											/>
											<div id="emailHelp" className={tenantsValidationArr[index][8].status ? 'form-text helper-text' : 'd-none'}>{tenantsValidationArr[index][8].msg}</div>
										</div>
									</div>

									<div className="form-group">
										<label htmlFor="email" className='form-label'>{content.email}</label>
										<input value={tenant.t_email} type="email" className="form-control" id="email" name='t_email' onChange={e => handleFormChange(index, e)} />
										<div id="emailHelp" className={tenantsValidationArr[index][6].status ? 'form-text helper-text' : 'd-none'}>{tenantsValidationArr[index][6].msg}</div>
									</div>

									<div className="upload-btn-wrapper mt-3">
										<button type='button' className="upload-btn text-left ">{content.id_doc}</button>
										<UploadIcon className='upload-icon' />
										<input type="file" className='upload-input' name="t_docFile" onChange={(e) => onDocFileChange(index, e)} accept="image/jpg, image/jpeg, image/png, file_extension/pdf" />
										{tenant.t_docName ? <p>{tenant.t_docName}</p> : <p>{content.no_file_selected}</p>}
										<div id="emailHelp" className={tenantsValidationArr[index][7].status ? 'form-text helper-text' : 'd-none'}>{tenantsValidationArr[index][7].msg}</div>

									</div>

									<p className='delete-text mt-4' onClick={() => deleteTenant(index)}>{content.delete}</p>
								</div>
							)
						})}
						<button className="btn toggle-btn mt-3" onClick={addNewTenant}>{content.yes_flatmate}</button>
						{
							status == 'new' ?
								<div className='row d-flex justify-content-center mt-4'>
									<button onClick={nextPageHandler} className='btn next-btn'>NEXT</button>
								</div> :
								status == 'edit' ?
									<div className='row d-flex justify-content-center mt-4'>
										<button onClick={nextPageHandler} className='btn save-btn'>SAVE</button>
									</div> :
									<></>
						}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Guarantee