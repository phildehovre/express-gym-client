import React from 'react'
import './membershipChoice.css'
import {CheckIcon} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MembershipCard = (props) => {
  const navigate = useNavigate()
    const {mt, preceding} = props
  const renderBenefits = () => {
    return mt.benefits.map(b => {
        return (
            <li key={b} className='benefit_list-item'>
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
        <div className="card_header">
          <div className="left">
            <h4>
              {mt.name}
            </h4>
            <h1>{mt.price}
              <small>/month</small>
            </h1>
          </div>
          <div className="right">
            <img src={mt.imageUrl} alt={mt.imageAlt} className="card_image" />
          </div>
          </div>
        <div className="card_body">
          {preceding && <p>Everything <b>
           {preceding} </b> offers plus: </p>}
          
            <ul className="benefits">{renderBenefits()}</ul>
        </div>
        <div className="card_footer">
          <button className='card_btn' onClick={() => navigate(`/checkout?type=${mt.name.toLowerCase()}`)}>Choose {mt.name}</button>
        </div>
    </div>
  )
}

export default MembershipCard