import React from 'react'
import './hero.css'
import {useNavigate} from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="background"></div>
    <section className="hero_ctn">
      <div className="hero-img_ctn">
        <img className="hero-img" src='https://res.cloudinary.com/dtnif6mzm/image/upload/v1737476934/express-gym/Leonardo_Lightning_XL_A_picture_of_a_smiling_person_in_the_mid_2_zlympz.jpg' alt='a happy gymgoer'/>
        <div className="badge">
          <div className="slogan">REACH<br />GOALS</div>
          <div className="slogan-sub"><em>your</em></div>
        </div>
      </div>
        <h1 className="promo">Work out 5 weeks extra*</h1>
        <button className="btn btn_primary" onClick={() => navigate('/checkout')}>Join</button>
        <button className="btn btn_secondary" onClick={() => navigate('/membership')}>See prices</button>
      <h2 className="partners-promo">+ Your first kilo of protein included</h2>
      <p>*Offer valid with our selected partners, claim this promotion anytime within 30days</p>
    </section>
    </>
  )
}

export default Hero