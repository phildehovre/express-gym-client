import React from 'react'
import Hero from '../components/hero'
import ClubFinder from '../components/ClubFinder'
import MembershipChoice from '../components/membershipChoice'
import FeatureCarousel from '../components/FeatureCarousel'

const Homepage = () => {
  return (
    <div className="homepage">
        <Hero /> 
        <ClubFinder offset={true}/>
        <MembershipChoice />
        <FeatureCarousel />
    </div>
  )
}

export default Homepage