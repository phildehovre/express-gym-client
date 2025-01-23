import React from 'react'
import './membershipChoice.css'
import {CheckIcon} from 'lucide-react'

const MembershipCard = (props) => {
    const {mt} = props
  const renderBenefits = () => {
    return mt.benefits.map(b => {
        return (
            <li key={b}>
                <CheckIcon />
                <p>
                    {b}
                </p>
            </li>
            )
    })
  }

  return (
    <div className='membership-card_ctn'>
        <div className="card_header">{mt.name}</div>
        <div className="card_body">
            <img src={mt.imageUrl} alt={mt.imageAlt} className="card_image" />
            <ul className="benefits">{renderBenefits()}</ul>
        </div>
        <div className="card_footer">
          <button>Select</button>
        </div>
    </div>
  )
}

export default MembershipCard