import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import { ReactComponent as EditIcon } from "../../media/edit.svg";
import { ReactComponent as HouseIcon } from "../../media/house.svg";
import { Link } from 'react-router-dom';


const Confirmation = () => {
    return (
        <div className='info-wrapper container'>
            <Breadcrumbs level={4}/>
            <Link to={"/signup/guarantee"}><p className='previous-text'>&lt;  Previous </p></Link>

            <div className='row'>
                <div className='col-sm-8 mt-3'>
                    <p className='detail-text1 text-center'>We are almost there. Is everything OK?</p>

                    <div className='detail-div pl-5'>
                        <div className='row'>
                            <p className='form-text1'>Services Requested</p>
                            <span className='edit-btn mt-1'>
                                <p>Edit<EditIcon className='ml-2' /></p>
                            </span>
                        </div>
                        <div className='row'>
                            <HouseIcon />
                            <p className='detail-text2 ml-2'>Residential</p>
                        </div>
                    </div>

                    <div className='detail-div mt-4 pl-5'>
                        <div className='row'>
                            <p className='form-text1'>Your Information</p>
                            <span className='edit-btn mt-1'>
                                <p>Edit<EditIcon className='ml-2' /></p>
                            </span>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <p className='detail-text3'>About You</p>

                                <p className='detail-text4'>Civility</p>
                                <p className='detail-text5'>Mr.</p>

                                <p className='detail-text4'>First Name</p>
                                <p className='detail-text5'>Jane</p>

                                <p className='detail-text4'>Last Name</p>
                                <p className='detail-text5'>Doe</p>

                                <p className='detail-text4'>Date of Birth</p>
                                <p className='detail-text5'>Mr.</p>

                                <p className='detail-text4'>Nationality</p>
                                <p className='detail-text5'>Pakistan</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>Current Address </p>

                                <p className='detail-text4'>Street No.</p>
                                <p className='detail-text5'>Backstreet Boys 22</p>

                                <p className='detail-text4'>Locality</p>
                                <p className='detail-text5'>54000 Lahore</p>

                                <p className='detail-text4'>Country</p>
                                <p className='detail-text5'>Pakistan</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>Contact Details</p>

                                <p className='detail-text4'>Mobile</p>
                                <p className='detail-text5'>+443 034 33 333</p>

                                <p className='detail-text4'>Email Address</p>
                                <p className='detail-text5'>hello@email.com</p>
                            </div>
                        </div>
                    </div>

                    <div className='detail-div mt-4 pl-5'>
                        <div className='row'>
                            <p className='form-text1'>Your Information</p>
                            <span className='edit-btn mt-1'>
                                <p>Edit<EditIcon className='ml-2' /></p>
                            </span>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <p className='detail-text3'>Price Calculation</p>

                                <p className='detail-text4'>Amount of a guarantee</p>
                                <p className='detail-text5'>342423</p>

                                <p className='detail-text4'>From the</p>
                                <p className='detail-text5'>0230230020</p>
                            </div>

                            <div className='col-md-4'>
                                <p className='detail-text3'>Address of a guarantee</p>

                                <p className='detail-text4'>Street No.</p>
                                <p className='detail-text5'>Backstreet Boys 22</p>

                                <p className='detail-text4'>Locality</p>
                                <p className='detail-text5'>54000 Lahore</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className='ml-5'>
                            <input className="form-check-input" type="checkbox" value="" id="confirmAuthenticity" />
                            <label className="form-check-label" for="confirmAuthenticity">
                                I confirm the authenticity of the entered and imported data.
                            </label>
                        </div>
                        <div className='ml-5'>
                            <input className="form-check-input" type="checkbox" value="" id="confirmToc" />
                            <label className="form-check-label" for="confirmToc">
                                I confirm that I have read and accept the Term and Condition.
                            </label>
                        </div>
                    </div>

                    
                    <div className='row d-flex justify-content-center mt-5'>
                        <Link to="/signup/payment">
                            <button className='btn next-btn'>NEXT</button>
                        </Link>
                    </div>


                </div>
            </div>

        </div>)
}

export default Confirmation