import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmedPage = ({ content }) => {

    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear()
    }, [])

    const handleHomeBtn =(e)=>{
        e.preventDefault()
        navigate('/')
    }
    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='container confirmed-wrapper' >
                <p className='con-text1'>{content.confirmed_msg}</p>
                <p className='con-text-sub1'>{content.confirmed_msg_sub1}</p>
                <p className='con-text-sub2'>{content.confirmed_msg_sub2}</p>
                <div className='btn-section-confirm'>
                    <button onClick={handleHomeBtn} type="button" className="home-btn-confirmation">Home</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmedPage