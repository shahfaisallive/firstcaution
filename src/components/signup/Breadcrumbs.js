import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ level }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top navbar-wrap">
            <div className='container-fluid ml-5 mr-5'>
                <a href='/' className="navbar-brand" id="brand-title" to="/"><img alt="logo" src={"/images/logo.png"} className='logo-img' id="navbar-logo"></img></a>
                <button className="navbar-toggler toggle-btn" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
                    <ul className="navbar-nav mt-3 ml-2">
                        <li className="nav-item d-flex">
                            <div className='breadcrumb-mark-active justify-content-center d-flex'>
                                <img src={"/images/check.png"} className="checkicon" alt='check' />
                            </div>
                            <Link to={"/signup"}><p className='text1'>Introduction</p></Link>
                        </li>
                        <li className="nav-item d-flex">
                            <div className={`' justify-content-center d-flex' + ${level >= 2 ? 'breadcrumb-mark-active' : 'breadcrumb-mark-inactive'}`}>
                                <p className={`${level > 2 ? 'bc-num-active text-center' : 'bc-num-inactive text-center'}`}>2</p>
                            </div>
                            <Link to={"/signup/information"}><p className='text1'>Your Information</p></Link>
                        </li>
                        <li className="nav-item d-flex">
                            <div className={`' justify-content-center d-flex' + ${level >=  3 ? 'breadcrumb-mark-active' : 'breadcrumb-mark-inactive'}`}>
                                <p className={`${level > 3 ? 'bc-num-active text-center' : 'bc-num-inactive text-center'}`}>3</p>
                            </div>
                            <Link to={"/signup/guarantee"}><p className='text1'>Guarantee</p></Link>
                        </li>
                        <li className="nav-item d-flex">
                            <div className={`' justify-content-center d-flex' + ${level >=  4 ? 'breadcrumb-mark-active' : 'breadcrumb-mark-inactive'}`}>
                                <p className={`${level > 4 ? 'bc-num-active text-center' : 'bc-num-inactive text-center'}`}>4</p>
                            </div>
                            <Link to={"/signup/confirmation"}><p className='text1'>Confirmation</p></Link>
                        </li>
                        <li className="nav-item d-flex">
                            <div className={`' justify-content-center d-flex' + ${level >=  5 ? 'breadcrumb-mark-active' : 'breadcrumb-mark-inactive'}`}>
                                <p className={`${level > 5 ? 'bc-num-active text-center' : 'bc-num-inactive text-center'}`}>5</p>
                            </div>
                            <Link to={"/signup/payment"}><p className='text1'>Payment</p></Link>
                        </li>
                        {/* <li className="nav-item endtext">
                            <p className='text1'>Exit</p>
                        </li> */}
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Breadcrumbs