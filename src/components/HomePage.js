import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { ReactComponent as Step1 } from "../media/step1.svg";
import { ReactComponent as Step2 } from "../media/step2.svg";
import { ReactComponent as Step3 } from "../media/step3.svg";
import { ReactComponent as IG } from "../media/ig.svg";
import { ReactComponent as LD } from "../media/ld.svg";
import { ReactComponent as FB } from "../media/fb.svg";
import { ReactComponent as Presentation } from "../media/presentation.svg";
import Navbar from './Navbar';
import LandingContent from "../landingContent.json"


const HomePage = ({ changeLanguage, language, content }) => {
    const [landingContent, setLandingContent] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let content = await axios.get("https://firstcaution.strapi.datamonitors.io/api/landing")
                setLandingContent(content.data.data.attributes)
                console.log(content.data.data.attributes)
            } catch (error) {
                setLandingContent(LandingContent)
            }
        }
        fetchData()
    }, [])

    return (
        <div className='homescreen-wrapper justify-content-center'>
            <Navbar changeLanguage={changeLanguage} language={language} content={content} />
            <div className='left-design-curve'></div>
            <div className='right-design-curve'></div>
            {!landingContent ? <div></div> :
                <div className='container'>
                    <div className='home-section1'>
                        <div className='row d-flex justify-content-center'>
                            <img alt="logo" src={"/images/logo.png"} className='logo-img'></img>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <p className='home-head1 text-center mt-5'>{landingContent.header_title}</p>
                        </div>
                        <p className='home-text1 text-center'>
                            {landingContent.header_info}
                        </p>

                        <div className='row d-flex justify-content-center mt-4'>
                            <NavLink to={`${language}/signup`}>
                                <button className='home-btn'>Request Now</button>
                            </NavLink>
                        </div>

                        <div className='row d-flex justify-content-center mt-4 pb-5'>
                            <img alt='head-img-promo' src={"https://media.swipepages.com/2022/2/5fb66525b9cd92001005df6f/canape-1500.png"} className="header-promo-img" />
                        </div>

                        <div className='row d-flex justify-content-center mt-5'>
                            <p className='home-head2 text-center'>{landingContent.landing_steps_title}</p>
                        </div>

                        <div className='row steps-div d-flex justify-content-center mt-5'>
                            <div className='col-4 pl-5 pr-5 steps-single-box'>
                                <div className='d-flex justify-content-center'>
                                    <Step1 className='step-icon'/>
                                </div>
                                <p className='home-text2 text-center mt-3'>{landingContent.step1_info}</p>
                            </div>
                            <div className='col-4 pl-5 pr-5 steps-single-box'>
                                <div className='d-flex justify-content-center'>
                                    <Step2 className='step-icon'/>
                                </div>
                                <p className='home-text2 text-center mt-3'>{landingContent.step2_info}</p>
                            </div>
                            <div className='col-4 pl-5 pr-5 steps-single-box'>
                                <div className='d-flex justify-content-center'>
                                    <Step3 className='step-icon'/>
                                </div>
                                <p className='home-text2 text-center mt-3'>{landingContent.step3_info}</p>
                            </div>
                        </div>

                    </div>

                    {/* <div className='home-section2 mt-5'>
                <p className='home-head2 text-center'>Reviews</p>
                <div className='row d-flex justify-content-center reviews-container'>
                    <div className='col-md-6'>
                        <div className='review-card-body'>
                            <div className='review-card-img'>
                                <img alt="reviewer" src={"/images/reviewer.jpg"} className='reviewer-img'></img>
                            </div>
                            <p className='r-card-text2 text-center'>"Friendliness, availability, professional support, simple, efficient and fast: I can only recommend it"</p>
                            <div className='review-card-title'>
                                <p className='r-card-text1 text-center'>Stephina Ubaldi</p>
                                <p className='r-card-text3 text-center'>Customer Reviews</p>
                                <div className='rating-box row d-flex justify-content-center'>
                                    <p className='rating-value'>4.6</p>
                                    <div className='rating-stars'>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false}
                                            value={4}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='review-card-body'>
                            <div className='review-card-img'>
                                <img alt="reviewer" src={"/images/reviewer.jpg"} className='reviewer-img'></img>
                            </div>
                            <p className='r-card-text2 text-center'>"Friendliness, availability, professional support, simple, efficient and fast: I can only recommend it"</p>
                            <div className='review-card-title'>
                                <p className='r-card-text1 text-center'>Stephina Ubaldi</p>
                                <p className='r-card-text3 text-center'>Customer Reviews</p>
                                <div className='rating-box row d-flex justify-content-center'>
                                    <p className='rating-value'>4.6</p>
                                    <div className='rating-stars'>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false}
                                            value={4}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

                    <div className='home-section3'>
                        <p className='home-head2 text-center'>That speaks for us</p>
                        <Presentation className='presentation' />
                    </div>

                    <div className='row d-flex justify-content-center'>
                        <NavLink to={`${language}/signup`}>
                            <button className='home-btn'>Request Now</button>
                        </NavLink>
                    </div>

                    <div className='row d-flex justify-content-center mt-5'>
                        <a href='https://www.instagram.com/firstcaution/' target={"_blank"}><IG className='ml-5 mr-5' /></a>
                        <a href='https://www.linkedin.com/company/845338' target={"_blank"}><LD className='ml-5 mr-5' /></a>
                        <a href='https://www.facebook.com/Firstcaution.SA/' target={"_blank"}><FB className='ml-5 mr-5' /></a>
                    </div>
                    <div className='row d-flex justify-content-center mt-5'>
                        <a href='https://www.firstcaution.ch/de/impressum/' target={"_blank"}><p className='mr-3'>Imprint</p></a>
                        <a href='https://www.firstcaution.ch/de/uber-uns/datenschutz/' target={"_blank"}><p className='ml-3'>Data Protection</p></a>
                    </div>
                </div>}

            <div className='row footer-note bg-primary mt-4 d-flex justify-content-center'>
                <p className='text-light text-center footer-text mt-1'>{landingContent ? landingContent.footer_info : ''}</p>
            </div>
        </div>
    )
}

export default HomePage