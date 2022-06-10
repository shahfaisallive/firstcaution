import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { ReactComponent as UploadIcon } from "../../media/upload-icon.svg";
import { useNavigate } from 'react-router-dom';


const Guarantee = ({ data }) => {
    const navigate = useNavigate()

    // Form Input states
    const [guaranteeStreet, setGuaranteeStreet] = useState("")
    const [guaranteeNo, setGuaranteeNo] = useState(0)
    const [guaranteeZipCode, setGuaranteeZipCode] = useState("")
    const [guaranteeLocality, setGuaranteeLocality] = useState("")
    const [guaranteeAmount, setGuaranteeAmount] = useState(0)
    const [moveInDate, setMoveInDate] = useState()
    const [promoCode, setPromoCode] = useState("")
    const [leaseFile, setLeaseFile] = useState("")
    const [IdFile, setIdFile] = useState("")

    const nextPageHandler = () => {
        localStorage.setItem('guaranteeStreet', guaranteeStreet);
        localStorage.setItem('guaranteeNo', guaranteeNo);
        localStorage.setItem('guaranteeZipCode', guaranteeZipCode);
        localStorage.setItem('guaranteeLocality', guaranteeLocality);
        localStorage.setItem('guaranteeAmount', guaranteeAmount);
        localStorage.setItem('moveInDate', moveInDate);
        localStorage.setItem('promoCode', promoCode);
        const leaseDoc = leaseFile.slice(27)
        localStorage.setItem('leaseFile', leaseDoc);
        const IdDoc = IdFile.slice(27)
        localStorage.setItem('IdFile', IdDoc);

        navigate('/signup/confirmation')
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
        console.log('here')
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            // console.log(e.target.files[0].size)
            const base64 = await getBase64(file)
            setIdFile(base64)
            // console.log(base64)

        }
    }


    const onLeaseFileChange = async (e) => {
        console.log('here1')
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            // console.log(e.target.files[0].size)
            const base64 = await getBase64(file)
            setLeaseFile(base64)
            // console.log(base64)

        }
    }


    return (
        <div className='info-wrapper container'>
            <Breadcrumbs level={3} />
            <Link to={"/signup/information"}><p className='previous-text'>&lt;  Previous </p></Link>

            <div className='row'>
                <div className='col-sm-8 form-div mt-3'>

                    {/* ADDRESS SECTION */}

                    <p className='form-text1'>What is the address for which you want to make a guarantee?</p>

                    <div className='row d-flex justify-content-start mt-4'>
                        <div className="form-group col-8">
                            <label htmlFor="street" className='form-label'>Street</label>
                            <input type="text" className="form-control" id="street" onChange={(e => setGuaranteeStreet(e.target.value))} />
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="number" className='form-label'>No.</label>
                            <input type="number" className="form-control" id="number" onChange={(e => setGuaranteeNo(e.target.value))} />
                        </div>
                    </div>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <label htmlFor="zip" className='form-label'>Zip Code</label>
                            <input type="text" className="form-control" id="zip" onChange={(e => setGuaranteeZipCode(e.target.value))} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="locality" className='form-label'>Locality</label>
                            <input type="text" className="form-control" id="locality" onChange={(e => setGuaranteeLocality(e.target.value))} />
                        </div>
                    </div>

                    {/* <div className="form-group mt-1">
                        <label htmlFor="country" className='form-label'>Country</label>
                        <select className="form-control" id="country">
                        {data.countries.map((country) => <option value={country.label} key={country.value}>{country.label}</option>
                                )}
                        </select>
                    </div> */}

                    {/* RENTAL PRICE SECTION */}
                    <p className='form-text1 mt-5'>Check the price of your rental agreement.</p>

                    <div className="form-group">
                        <label htmlFor="guaranteeAmount" className='form-label'>Amount in guarantee</label>
                        <input type="number" className="form-control" id="guaranteeAmount" onChange={(e => setGuaranteeAmount(e.target.value))} />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="moveDate" className='form-label'>Move in Date</label>
                        <input type="date" className="form-control" id="moveDate" onChange={(e => setMoveInDate(e.target.value))} />
                    </div>

                    <div className="form-group mt-1 mb-5">
                        <label htmlFor="guaranteeAmount" className='form-label'>Promo Code ( Optional )</label>
                        <input type="number" className="form-control" id="guaranteeAmount" onChange={(e => setPromoCode(e.target.value))} />
                        <label className='form-label'>If your promo code is validated, it will be applied to your invoice</label>
                    </div>

                    {/* DOCUMENTS SECTIONS */}
                    <p className='form-text1 mt-5'>Documents</p>
                    <p className='form-text2'>Add your documents now and send them later by post, email or WhatsApp.</p>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <div className="upload-btn-wrapper">
                                <button className="upload-btn text-left">ADD A LEASE</button>
                                <UploadIcon className='upload-icon' />
                                <input type="file" name="myfile" onChange={onLeaseFileChange} />
                            </div>
                            {leaseFile ? <img src={leaseFile} className="file-img" /> : <p>No file selected</p>}
                        </div>
                        <div className="form-group col-6">
                            <div className="upload-btn-wrapper">
                                <button className="upload-btn text-left">ADD AN IDENTITY DOCUMENT</button>
                                <UploadIcon className='upload-icon' />
                                <input type="file" name="myfile" onChange={onIDFileChange} />
                            </div>
                            {IdFile ? <img src={IdFile} className="file-img" /> : <p>No file selected</p>}

                        </div>
                    </div>

                    {/* FLATMATE OR GUARANTOR SECTION */}
                    <p className='form-text1 mt-5'>Do you have a flatmate or a guarantor?</p>
                    <button className="btn toggle-btn">YES I ADD A FLATMATE OR A GUARANTOR</button>

                    {/* <p className='form-text2'>Person</p> */}

                    {/* <div>
                        <div className='row d-flex justify-content-start mt-5'>
                            <div className="form-group col-6">
                                <label htmlFor="type" className='form-label'>Type</label>
                                <input type="text" className="form-control" id="type" />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="civility" className='form-label'>Civility</label>
                                <input type="text" className="form-control" id="civility" />
                            </div>
                        </div>

                        <div className='row d-flex justify-content-start mt-1'>
                            <div className="form-group col-6">
                                <label htmlFor="firstname" className='form-label'>First Name</label>
                                <input type="text" className="form-control" id="type" />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="lasttime" className='form-label'>Last Name</label>
                                <input type="text" className="form-control" id="lasttime" />
                            </div>
                        </div>

                        <div className='row d-flex justify-content-start mt-1'>
                            <div className="form-group col-6">
                                <label htmlFor="dob" className='form-label'>Date of Birth</label>
                                <input type="date" className="form-control" id="dob" />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="nationality" className='form-label'>Nationality</label>
                                <select className="form-control" id="nationality">
                                    <option>American</option>
                                    <option>British</option>
                                    <option>Pakistani</option>
                                </select>
                            </div>
                        </div>

                        <div className='row d-flex justify-content-start mt-1'>
                            <div className="form-group col-4">
                                <label htmlFor="mobile" className='form-label'>Mobile</label>
                                <input type="number" className="form-control" id="mobile" />
                            </div>
                            <div className="form-group col-8">
                                <label htmlFor="num" className='form-label'>Number</label>
                                <input type="text" className="form-control" id="num" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className='form-label'>Email</label>
                            <input type="email" className="form-control" id="email" />
                        </div>

                        <div className="upload-btn-wrapper mt-3">
                            <button className="upload-btn text-left ">ADD AN IDENTITY DOCUMENT</button>
                            <UploadIcon className='upload-icon' />
                            <input type="file" name="myfile" />
                        </div>

                        <button className="btn toggle-btn mt-3">YES I ADD A FLATMATE OR A GUARANTOR</button>

                        <p className='delete-text mt-4'>Delete</p>
                    </div> */}



                    <div className='row d-flex justify-content-center mt-4'>
                        <button className='btn next-btn' onClick={nextPageHandler}>NEXT</button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Guarantee