import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'

const Information = () => {

    return (
        <div className='info-wrapper container'>
            <Breadcrumbs level={2} />
            <Link to={"/signup"}><p className='previous-text'>&lt;  Previous </p></Link>

            <div className='row'>
                <div className='col-sm-8 form-div mt-3'>
                    <p className='form-text1'>We just need some information</p>
                    <div className="form-group mt-4">
                        <label for="civility" className='form-label'>Civility</label>
                        <select className="form-control" id="civility">
                            <option>Mr.</option>
                            <option>Ms.</option>
                        </select>
                    </div>
                    <div className='row d-flex justify-content-start mt-1'>
                        <div className="form-group col-6">
                            <label for="firstname" className='form-label'>First Name</label>
                            <input type="text" className="form-control" id="firstname" />
                        </div>
                        <div className="form-group col-6">
                            <label for="lastname" className='form-label'>Last Name</label>
                            <input type="text" className="form-control" id="lastname" />
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

                    <p className='form-text1 mt-5'>What is your current address?</p>

                    <div className='row d-flex justify-content-start mt-1'>
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

                    <p className='form-text1 mt-5'>How to contact you?</p>

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

                    <div className='row d-flex justify-content-center mt-4'>
                        <Link to="/signup/guarantee">
                            <button className='btn next-btn'>NEXT</button>
                        </Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Information