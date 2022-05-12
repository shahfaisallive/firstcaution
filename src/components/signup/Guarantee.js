import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { ReactComponent as UploadIcon } from "../../media/upload-icon.svg";


const Guarantee = () => {
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
                            <label for="street" className='form-label'>Street</label>
                            <input type="text" className="form-control" id="street" />
                        </div>
                        <div className="form-group col-4">
                            <label for="number" className='form-label'>No.</label>
                            <input type="number" className="form-control" id="number" />
                        </div>
                    </div>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <label for="zip" className='form-label'>Zip Code</label>
                            <input type="text" className="form-control" id="zip" />
                        </div>
                        <div className="form-group col-6">
                            <label for="locality" className='form-label'>Locality</label>
                            <input type="text" className="form-control" id="locality" />
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        <label for="country" className='form-label'>Country</label>
                        <select className="form-control" id="country">
                            <option>United States</option>
                            <option>Canada</option>
                        </select>
                    </div>

                    {/* RENTAL PRICE SECTION */}
                    <p className='form-text1 mt-5'>Check the price of your rental agreement.</p>

                    <div className="form-group">
                        <label for="guaranteeAmount" className='form-label'>Amount in guarantee</label>
                        <input type="number" className="form-control" id="guaranteeAmount" />
                    </div>

                    <div className="form-group mt-1">
                        <label for="moveDate" className='form-label'>Move in Date</label>
                        <input type="date" className="form-control" id="moveDate" />
                    </div>

                    <div className="form-group mt-1 mb-5">
                        <label for="guaranteeAmount" className='form-label'>Promo Code ( Optional )</label>
                        <input type="number" className="form-control" id="guaranteeAmount" />
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
                                <input type="file" name="myfile" />
                            </div>
                        </div>
                        <div className="form-group col-6">
                            <div className="upload-btn-wrapper">
                                <button className="upload-btn text-left">ADD AN IDENTITY DOCUMENT</button>
                                <UploadIcon className='upload-icon' />
                                <input type="file" name="myfile" />
                            </div>
                        </div>
                    </div>

                    <p className='form-text1 mt-5'>Check the price of your rental agreement.</p>

                    <button className="btn toggle-btn">YES I ADD A FLATMATE OR A GUARANTOR</button>

                    {/* FLATMATE OR GUARANTOR SECTION */}
                    <p className='form-text1 mt-5'>Do you have a flatmate or a guarantor?</p>

                    {/* <p className='form-text2'>Person</p> */}

                    <div className='row d-flex justify-content-start mt-5'>
                        <div className="form-group col-6">
                            <label for="type" className='form-label'>Type</label>
                            <input type="text" className="form-control" id="type" />
                        </div>
                        <div className="form-group col-6">
                            <label for="civility" className='form-label'>Civility</label>
                            <input type="text" className="form-control" id="civility" />
                        </div>
                    </div>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <label for="firstname" className='form-label'>First Name</label>
                            <input type="text" className="form-control" id="type" />
                        </div>
                        <div className="form-group col-6">
                            <label for="lasttime" className='form-label'>Last Name</label>
                            <input type="text" className="form-control" id="lasttime" />
                        </div>
                    </div>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <label for="dob" className='form-label'>Date of Birth</label>
                            <input type="date" className="form-control" id="dob" />
                        </div>
                        <div className="form-group col-6">
                            <label for="nationality" className='form-label'>Nationality</label>
                            <select className="form-control" id="nationality">
                                <option>American</option>
                                <option>British</option>
                                <option>Pakistani</option>
                            </select>
                        </div>
                    </div>

                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-4">
                            <label for="mobile" className='form-label'>Mobile</label>
                            <input type="number" className="form-control" id="mobile" />
                        </div>
                        <div className="form-group col-8">
                            <label for="num" className='form-label'>Number</label>
                            <input type="text" className="form-control" id="num" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="email" className='form-label'>Email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>

                    <div className="upload-btn-wrapper mt-3">
                        <button className="upload-btn text-left ">ADD AN IDENTITY DOCUMENT</button>
                        <UploadIcon className='upload-icon' />
                        <input type="file" name="myfile" />
                    </div>

                    <button className="btn toggle-btn mt-3">YES I ADD A FLATMATE OR A GUARANTOR</button>

                    <p className='delete-text mt-4'>Delete</p>



                    <div className='row d-flex justify-content-center mt-4'>
                        <Link to="/signup/confirmation">
                            <button className='btn next-btn'>NEXT</button>
                        </Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Guarantee