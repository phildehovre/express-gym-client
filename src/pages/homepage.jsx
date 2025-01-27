import React from 'react'
import Hero from '../components/hero'
import ClubFinder from '../components/ClubFinder'
import MembershipChoice from '../components/MembershipChoice'

const Homepage = () => {
  return (
    <div className="homepage">
        <Hero />
        <ClubFinder />
        <MembershipChoice />
    </div>
  )
}

export default Homepage