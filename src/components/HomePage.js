import React from 'react'

import Navbar from './Navbar'

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className='homescreen-wrapper d-flex justify-content-center'>
                <p className='display-4 text-center'>Landing Page Content</p>
            </div>
        </>
    )
}

export default HomePage