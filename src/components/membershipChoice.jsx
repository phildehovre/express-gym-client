import React from 'react'
import { membershipTypes } from '../const/membershipTypes'
import MembershipCard from './membershipCard'

const MembershipChoice = () => {
    const renderMembershipCards = () => {
        return membershipTypes.map(mt => {
            return (
                <MembershipCard mt={mt} key={mt.name} />
            )
        })
    }

  return (
    <div className='memberships_ctn'>
        {renderMembershipCards()}
    </div>
  )
}

export default MembershipChoice