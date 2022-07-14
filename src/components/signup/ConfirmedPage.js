import React, { useEffect } from 'react'

const ConfirmedPage = ({content}) => {
    useEffect(() => {
        localStorage.clear()
    }, [])
    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='container confirmed-wrapper' >
                <p className='con-text1 text-center'>{content.confirmed_msg}</p>
            </div>
        </div>
    )
}

export default ConfirmedPage