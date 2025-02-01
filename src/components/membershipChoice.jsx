import React from 'react'
import { membershipTypes } from '../const/membershipTypes'
import MembershipCard from './membershipCard'

const MembershipChoice = () => {
    const renderMembershipCards = () => {
        return membershipTypes.map((mt, i) => {
            return (
                <MembershipCard 
                    mt={mt} 
                    key={mt.name} 
                    preceding={i != 0 && membershipTypes[i -1].name}
                />

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