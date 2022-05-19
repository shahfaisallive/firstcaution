import React from 'react'
import { NavLink } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { ReactComponent as Step1 } from "../media/step1.svg";
import { ReactComponent as Step2 } from "../media/step2.svg";
import { ReactComponent as Step3 } from "../media/step3.svg";
import { ReactComponent as IG } from "../media/ig.svg";
import { ReactComponent as LD } from "../media/ld.svg";
import { ReactComponent as FB } from "../media/fb.svg";
import { ReactComponent as Presentation } from "../media/presentation.svg";


const HomePage = () => {
    return (
        <div className='homescreen-wrapper justify-content-center'>
            <div className='left-design-curve'></div>
            <div className='right-design-curve'></div>
            <div className='container'>
                <div className='home-section1'>
                    <div className='row d-flex justify-content-center'>
                        <img alt="logo" src={"/images/logo.png"} className='logo-img'></img>
                    </div>
                    <div>
                        <p className='home-head1 text-center mt-5'>The flexible rental<br /> deposit for everyone</p>
                        <p className='home-text1 text-center'>*Discount on the 2022 bounty until April 15 <br />
                            2022 with the promo code "ForABetter2022"</p>
                    </div>

                    <div className='row d-flex justify-content-center mt-4'>
                        <NavLink to="/signup">
                            <button className='home-btn'>Register and Save</button>
                        </NavLink>
                    </div>

                    <div className='row d-flex justify-content-center mt-4 pb-5'>
                        <img alt='head-img-promo' src={"https://media.swipepages.com/2022/2/5fb66525b9cd92001005df6f/canape-1500.png"} className="header-promo-img" />
                    </div>

                    <div className='row d-flex justify-content-center mt-5'>
                        <p className='home-head2'>In just 3 minutes to the rental deposit</p>
                    </div>

                    <div className='row steps-div d-flex justify-content-center mt-5'>
                        <div className='col-4 pl-5 pr-5'>
                            <div className='d-flex justify-content-center'>
                                <Step1 />
                            </div>
                            <p className='home-text2 text-center mt-3'>Enter your current details (address and telephone number).</p>
                        </div>
                        <div className='col-4 pl-5 pr-5'>
                            <div className='d-flex justify-content-center'>
                                <Step2 />
                            </div>
                            <p className='home-text2 text-center mt-3'>Enter new address, rental deposit, move-in date, promo code</p>
                        </div>
                        <div className='col-4 pl-5 pr-5'>
                            <div className='d-flex justify-content-center'>
                                <Step3 />
                            </div>
                            <p className='home-text2 text-center mt-3'>Enter new address, rental deposit, move-in date, promo code</p>
                        </div>
                    </div>

                </div>

                <div className='home-section2 mt-5'>
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
                </div>

                <div className='home-section3'>
                    <p className='home-head2 text-center'>That speaks for us</p>
                    <Presentation className='presentation' />
                </div>

                <div className='row d-flex justify-content-center'>
                    <button className='home-btn'>Get Started & Save</button>
                </div>

                <div className='row d-flex justify-content-center mt-5'>
                    <IG className='ml-5 mr-5'/>
                    <LD  className='ml-5 mr-5'/>
                    <FB className='ml-5 mr-5'/>
                </div>
            </div>

            <div className='row footer-note bg-primary mt-4 d-flex justify-content-center'>
                    <p className='text-light text-center mt-1'>*This discount cannot be combined with other Firstcaution offers. </p>
                </div>
        </div>
    )
}

export default HomePage