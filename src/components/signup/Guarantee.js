import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { ReactComponent as UploadIcon } from "../../media/upload-icon.svg";
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ContactBox from '../ContactBox';

const Guarantee = ({ language, content }) => {
	const navigate = useNavigate()
	const params = useParams()
	const { status } = params
	// Form Input states
	const [data, setData] = useState()
	const [guaranteeStreet, setGuaranteeStreet] = useState("")
	const [guaranteeNo, setGuaranteeNo] = useState(0)
	const [guaranteeZipCode, setGuaranteeZipCode] = useState("")
	const [guaranteeLocality, setGuaranteeLocality] = useState("")
	const [guaranteeAmount, setGuaranteeAmount] = useState(0)
	const [moveInDate, setMoveInDate] = useState()
	const [promoCode, setPromoCode] = useState("")
	const [leaseFile, setLeaseFile] = useState("")
	const [IdFile, setIdFile] = useState("")
	const [leaseFileName, setLeaseFileName] = useState("")
	const [IdFileName, setIdFileName] = useState("")

	// Tenant States
	const [tenants, setTenants] = useState([])
	const [tenantsDocs, setTenantsDocs] = useState([])
	const [tNum, setTNum] = useState()
	const [indexForTNum, setIndexForTNum] = useState()

	useEffect(() => {
		if (!data) {
			setData(JSON.parse(localStorage.getItem("data")))
		}
	}, [])

	useEffect(() => {
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
		}
	}, [status])

	const nextPageHandler = () => {
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
		console.log(tenants)
	}

	useEffect(() => {
		if (tenants.length !== 0) {
			let data = [...tenants];
			data[indexForTNum]['t_mobile'] = tNum;
			setTenants(data);
			console.log(tenants)
		}
	}, [tNum])

	const onDocFileChange = async (index, e) => {
		let data = [...tenants];
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setTenantsDocs([...tenantsDocs, file.name])
			data[index]['t_docName'] = file.name
			const base64 = await getBase64(file)
			data[index]['t_docFile'] = base64.slice(27)
			console.log(tenants)
		}
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
	}

	const deleteTenant = (index) => {
		let data = [...tenants];
		data.splice(index, 1)
		setTenants(data)
	}

	return (
		<div className='info-wrapper container'>
			<ContactBox />
			<Breadcrumbs level={3} content={content} />
			<Link to={`/${language}/signup/information`}><p className='previous-text'>&lt;  {content.previous} </p></Link>

			<div className='row'>
				<div className='col-sm-8 form-div mt-3'>

					{/* ADDRESS SECTION */}

					<form onSubmit={nextPageHandler}>
						<p className='form-text1'>{content.guar_head1}</p>

						<div className='row d-flex justify-content-start mt-4'>
							<div className="form-group col-8">
								<label htmlFor="street" className='form-label'>{content.street}</label>
								<input value={guaranteeStreet}  type="text" className="form-control" id="street" onChange={(e => setGuaranteeStreet(e.target.value))} />
							</div>
							<div className="form-group col-4">
								<label htmlFor="number" className='form-label'>{content.no}</label>
								<input value={guaranteeNo} type="number" className="form-control" id="number" onChange={(e => setGuaranteeNo(e.target.value))} />
							</div>
						</div>

						<div className='row d-flex justify-content-start mt-1'>
							<div className="form-group col-6">
								<label htmlFor="zip" className='form-label'>{content.zip_code}</label>
								<input value={guaranteeZipCode} type="text" className="form-control" maxLength={4} id="zip" onChange={(e => setGuaranteeZipCode(e.target.value))} />
							</div>
							<div className="form-group col-6">
								<label htmlFor="locality" className='form-label'>{content.locality}</label>
								<input value={guaranteeLocality} type="text" className="form-control" id="locality" onChange={(e => setGuaranteeLocality(e.target.value))} />
							</div>
						</div>
						<p className='form-text1 mt-5'>{content.guar_head2}</p>
						<div className="form-group">
							<label htmlFor="guaranteeAmount" className='form-label'>{content.amount_in_guarantee}</label>
							<input value={guaranteeAmount}  type="number" className="form-control" id="guaranteeAmount" onChange={(e => setGuaranteeAmount(e.target.value))} />
						</div>

						<div className="form-group mt-1">
							<label htmlFor="moveDate" className='form-label'>{content.mone_in_date}</label>
							<input value={moveInDate}  type="date" className="form-control" id="moveDate" onChange={(e => setMoveInDate(e.target.value))} />
						</div>

						<div className="form-group mt-1 mb-5">
							<label htmlFor="guaranteeAmount" className='form-label'>{content.promo_code}</label>
							<input value={promoCode}  type="text" className="form-control" id="guaranteeAmount" onChange={(e => setPromoCode(e.target.value))} />
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
							</div>
							<div className="form-group col-6">
								<div className="upload-btn-wrapper">
									<button type='button' className="upload-btn text-left">{content.id_doc}</button>
									<UploadIcon className='upload-icon' />
									<input type="file" className='upload-input' name="myfile" onChange={onIDFileChange} accept="image/jpg, image/jpeg, image/png, file_extension/pdf" />
								</div>
								{IdFileName ? <p>{IdFileName}</p> : <p>{content.no_file_selected}</p>}

							</div>
						</div>
						<p className='form-text1 mt-5'>{content.guar_head4}</p>
						{tenants.map((tenant, index) => {
							return (
								<div key={index}>
									<div className='row d-flex justify-content-start mt-5'>
										<div className="form-group col-6">
											<label htmlFor="type" className='form-label'>{content.type}</label>
											<select className="form-control" defaultValue={'Tenant'} id="type" name='t_type' onChange={e => handleFormChange(index, e)}>
												<option value="Guarantor">Guarantor</option>
												<option value="Tenant" selected>Tenant</option>
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
											<input required type="text" className="form-control" id="type" name='t_firstName' onChange={e => handleFormChange(index, e)} />
										</div>
										<div className="form-group col-6">
											<label htmlFor="lasttime" className='form-label'>{content.last_name}</label>
											<input required type="text" className="form-control" id="lasttime" name='t_lastName' onChange={e => handleFormChange(index, e)} />
										</div>
									</div>

									<div className='row d-flex justify-content-start mt-1'>
										<div className="form-group col-6">
											<label htmlFor="dob" className='form-label'>{content.date_of_birth}</label>
											<input type="date" className="form-control" id="dob" name='t_dob' onChange={e => handleFormChange(index, e)} />
										</div>
										<div className="form-group col-6">
											<label htmlFor="nationality" className='form-label'>{content.nationality}</label>
											<select defaultValue="CH" className="form-control" id="nationality" name='t_nationality' onChange={e => handleFormChange(index, e)}>
												{data.countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>
												)}
											</select>
										</div>
									</div>

									<div className='row d-flex justify-content-start mt-1'>
										<div className="form-group col-12">
											<label htmlFor="num" className='form-label'>{content.number}</label>
											<PhoneInput
												defaultCountry='CH'
												placeholder="Enter phone number"
												value={tNum}
												onChange={setTNum} className="phone-input-field" onFocus={() => setIndexForTNum(index)}
											/>
										</div>
									</div>

									<div className="form-group">
										<label htmlFor="email" className='form-label'>{content.email}</label>
										<input type="email" className="form-control" id="email" name='t_email' onChange={e => handleFormChange(index, e)} />
									</div>

									<div className="upload-btn-wrapper mt-3">
										<button type='button' className="upload-btn text-left ">{content.id_doc}</button>
										<UploadIcon className='upload-icon' />
										<input type="file" className='upload-input' name="t_docFile" onChange={(e) => onDocFileChange(index, e)} accept="image/jpg, image/jpeg, image/png, file_extension/pdf" />
										{tenantsDocs[index] ? <p>{tenantsDocs[index]}</p> : <p>{content.no_file_selected}</p>}
									</div>

									<p className='delete-text mt-4' onClick={() => deleteTenant(index)}>{content.delete}</p>
								</div>
							)
						})}
						<button className="btn toggle-btn mt-3" onClick={addNewTenant}>{content.yes_flatmate}</button>
						{
							status == 'new' ?
								<div className='row d-flex justify-content-center mt-4'>
									<button className='btn next-btn' type='submit'>NEXT</button>
								</div> :
								status == 'edit' ?
									<div className='row d-flex justify-content-center mt-4'>
										<button className='btn save-btn'>SAVE</button>
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