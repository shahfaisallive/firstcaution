import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {

    return (
        <nav className={`navbar navbar-expand-lg navbar-light fixed-top navbar-wrap`}>
            <div className='container-fluid ml-5 mr-5'>
                <a href='/' className="navbar-brand" id="brand-title" to="/"><img alt="logo" src={"/images/logo.png"} className='logo-img' id="navbar-logo"></img></a>
                <button className="navbar-toggler toggle-btn" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav mt-3">
                        <li className="nav-item">
                            <select name="language" id="language">
                                <option value="english" selected>EN</option>
                                <option value="german">DE</option>
                                <option value="italian">IT</option>
                                <option value="french">FR</option>
                            </select>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link signup-btn" to="/signup"><p className='text-light ml-3 mr-3'>SIGN UP NOW</p></NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
