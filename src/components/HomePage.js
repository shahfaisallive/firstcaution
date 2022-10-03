import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { ReactComponent as Step1 } from "../media/step1.svg";
import { ReactComponent as Step2 } from "../media/step2.svg";
import { ReactComponent as Step3 } from "../media/step3.svg";
import { ReactComponent as IG } from "../media/ig.svg";
import { ReactComponent as LD } from "../media/ld.svg";
import { ReactComponent as FB } from "../media/fb.svg";
import { ReactComponent as Presentation } from "../media/presentation.svg";
import { ReactComponent as Headphones } from "../media/headphone.svg";
import { ReactComponent as Flash } from "../media/flash.svg";
import { ReactComponent as Database } from "../media/database.svg";
import Navbar from './Navbar';
import LandingContent from "../landingContent.json"
// import Logo from "./"


const HomePage = ({ changeLanguage, language, content }) => {
	const params = useParams()
	const langParam = params.language
	const [landingContent, setLandingContent] = useState()

	useEffect(() => {
		changeLanguage(langParam)
		const fetchData = async () => {
			try {
				let content
				if (language == "en") {
					content = await axios.get("https://firstcaution.strapi.datamonitors.io/api/landing")
				} else if (language == "de") {
					content = await axios.get("https://firstcaution.strapi.datamonitors.io/api/de-landing")
				} else if (language == "fr") {
					content = await axios.get("https://firstcaution.strapi.datamonitors.io/api/fr-landing")
				} else if (language == "it") {
					content = await axios.get("https://firstcaution.strapi.datamonitors.io/api/it-landing")
				}
				setLandingContent(content.data.data.attributes)
				console.log(content.data.data.attributes)
			} catch (error) {
				setLandingContent(LandingContent)
			}
		}
		fetchData()
	}, [language])

	return (
		<div className='homescreen-wrapper justify-content-center'>
			<Navbar changeLanguage={changeLanguage} language={language} content={content} />
			<div className='left-design-curve'></div>
			<div className='right-design-curve'></div>
			{!landingContent ? <div></div> :
				<div className='container pb-3'>
					<div className='home-section1'>
						<div className='row d-flex justify-content-center'>
							<img alt="logo" src={"/images/logo.png"} className='logo-img'></img>
						</div>
						<div className='d-flex justify-content-center'>
							<p className='home-head1 text-center mt-5'>{landingContent.header_info}</p>
						</div>
						<p className='home-text1 text-center'>
							{landingContent.header_title}
						</p>

						<div className='row d-flex justify-content-center mt-4'>
							<NavLink to={`/${langParam}/signup`}>
								<button className='home-btn'>{landingContent.req_btn}</button>
							</NavLink>
						</div>

						<div className='row d-flex justify-content-center mt-4 pb-5 pt-2'>
							<img alt='head-img-promo' src={"/images/landingImg.png"} className="header-promo-img" />
						</div>

						<div className='row d-flex justify-content-center mt-5'>
							<p className='home-head2 text-center'>{landingContent.landing_steps_title}</p>
						</div>

						{/* Steps section web view */}
						<div className='row steps-div steps-web-view d-flex justify-content-center mt-5'>
							<div className='col-4 pl-5 pr-5 steps-single-box'>
								<div className='d-flex justify-content-center'>
									<Step1 className='step-icon' />
								</div>
								<p className='home-text2 text-center'>{landingContent.step1_info}</p>
							</div>
							<div className='col-4 pl-5 pr-5 steps-single-box'>
								<div className='d-flex justify-content-center'>
									<Step2 className='step-icon' />
								</div>
								<p className='home-text2 text-center'>{landingContent.step2_info}</p>
							</div>
							<div className='col-4 pl-5 pr-5 steps-single-box'>
								<div className='d-flex justify-content-center'>
									<Step3 className='step-icon' />
								</div>
								<p className='home-text2 text-center'>{landingContent.step3_info}</p>
							</div>
						</div>


						{/* Steps section mobile view */}
						<div className='row steps-mob-view d-flex justify-content-center '>
							<div className='col-12'>
								<div className='row d-flex justify-content-center'>
									<Step1 className='step-icon' />
								</div>
								<p className='home-text2 text-center'>{landingContent.step1_info}</p>
								<div className='row d-flex justify-content-center'>
									<Step2 className='step-icon' />
								</div>
								<p className='home-text2 text-center '>{landingContent.step2_info}</p>

								<div className='row d-flex justify-content-center'>
									<Step3 className='step-icon' />
								</div>
								<p className='home-text2 text-center'>{landingContent.step3_info}</p>
							</div>
						</div>

					</div>

					<div className='home-section3 presentation-web-view'>
						{/* <p className='home-head2 text-center'>That speaks for us</p> */}
						{/* <Presentation className='presentation' /> */}
						<div className='shadow py-2 px-4' style={{ borderRadius: "11%", border: "6px solid #3f7bdb" }}>
							{/* <div className='py-4'>
                                <img src="../images/logo.png"/>
                            </div> */}
							<table className="table table-borderless">
								<h3>{landingContent.advantagesheading}</h3>
								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col"></th>
										{/* <th scope="col"></th> */}
									</tr>
								</thead>
								<tbody>
									<tr>
										{/* <th scope="row">1</th> */}
										<td>{landingContent.advantagespoint1}</td>
										<td >
											<i className="fa-solid fa-check blue fw-bold"></i>

										</td>
										{/* <td> 
      <i className="fa-solid fa-xmark"></i>
      </td> */}
									</tr>
									<tr>
										{/* <th scope="row">2</th> */}
										<td>{landingContent.advantagespoint2}</td>
										<td>

											<i className="fa-solid fa-check blue fw-bold"></i>

										</td>
										{/* <td>

      <i className="fa-solid fa-xmark"></i>
      </td> */}
									</tr>
									<tr>
										{/* <th scope="row">3</th> */}
										<td>{landingContent.advantagespoint3}</td>
										<td>

											<i className="fa-solid fa-check blue fw-bold"></i>

										</td>
										{/* <td>
      <i className="fa-solid fa-xmark"></i>
      </td> */}
									</tr>
									<tr>
										{/* <th scope="row">3</th> */}
										<td>{landingContent.advantagespoint4}</td>
										<td>
											<i className="fa-solid fa-check blue fw-bold"></i>

										</td>
										{/* <td>
      <i className="fa-solid fa-xmark"></i>
      </td> */}
									</tr>
									<tr>
										{/* <th scope="row">3</th> */}
										<td>{landingContent.advantagespoint5}</td>
										<td>
											<i className="fa-solid fa-check blue fw-bold"></i>

										</td>
										{/* <td>
      <i className="fa-solid fa-xmark"></i>
      </td> */}
									</tr>
									<tr>
										{/* <th scope="row">3</th> */}
										<td>{landingContent.advantagespoint6}</td>
										<td>
											<i className="fa-solid fa-check blue fw-bold"></i>

										</td>
										{/* <td>
      <i className="fa-solid fa-xmark"></i>
      </td> */}
									</tr>
								</tbody>
							</table>




						</div>
						{/* <div className='d-flex justify-content-between mt-5 ml-5 mr-5'>
                            <div className='present-circle'>
                                <div className='row d-flex justify-content-center'>
                                    <Flash className='present-logo'/>
                                </div>
                                <p className='home-text3 text-center mt-3'>{landingContent.present_text1}</p>
                            </div>
                            <div className='present-circle'>
                                <div className='row d-flex justify-content-center'>
                                    <Database className='present-logo'/>
                                </div>
                                <p className='home-text3 text-center mt-3'>{landingContent.present_text2}</p>
                            </div>
                            <div className='present-circle'>
                                <div className='row d-flex justify-content-center'>
                                    <Headphones className='present-logo'/>
                                </div>
                                <p className='home-text3 text-center mt-3'>{landingContent.present_text3}</p>
                            </div>
                        </div> */}
					</div>

					{/* <div className='row home-section3 presentation-mobile-view'>
                        <p className='home-head2 text-center'>That speaks for us</p>
                        <div className='col-12 mt-5'>
                            <div className='row d-flex justify-content-center'>
                                <Flash />
                            </div>
                            <p className='home-text2 text-center mt-3'>{landingContent.present_text1}</p>
                            <div className='row d-flex justify-content-center mt-5'>
                                <Database />
                            </div>
                            <p className='home-text2 text-center mt-3'>{landingContent.present_text2}</p>

                            <div className='row d-flex justify-content-center mt-5'>
                                <Headphones />
                            </div>
                            <p className='home-text2 text-center mt-3'>{landingContent.present_text3}</p>
                        </div>
                    </div> */}

					<div className='row d-flex justify-content-center mt-5'>
						<NavLink to={`/${langParam}/signup`}>
							<button className='home-btn' id='home-req-btn2'>{landingContent.req_btn}</button>
						</NavLink>
					</div>

					<div className='row d-flex justify-content-center mt-5'>
						<a href='https://www.instagram.com/firstcaution/' target={"_blank"}><IG className=' home-social-icon' /></a>
						<a href='https://www.linkedin.com/company/845338' target={"_blank"}><LD className=' home-social-icon' /></a>
						<a href='https://www.facebook.com/Firstcaution.SA/' target={"_blank"}><FB className=' home-social-icon' /></a>
					</div>
					<div className='row d-flex justify-content-between protect-imprint-div mt-5'>
						<a href='https://www.firstcaution.ch/de/impressum/' target={"_blank"}><p className=''>Imprint</p></a>
						<a href='https://www.firstcaution.ch/de/uber-uns/datenschutz/' target={"_blank"}><p className=''>Data Protection</p></a>
					</div>
				</div>}

			{/* <div className='row footer-note bg-primary mt-4 d-flex justify-content-center'>
                <p className='text-light text-center footer-text mt-1'>{landingContent ? landingContent.footer_info : ''}</p>
            </div> */}
		</div>
	)
}

export default HomePage