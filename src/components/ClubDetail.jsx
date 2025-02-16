import { CheckIcon } from 'lucide-react'
import React from 'react'
import './ClubDetail.css'

const ClubDetail = ({location}) => {
    
  return (
  <div className="club-detail_ctn">
    <div className="club-detail_header">
        <h1>{location.address}</h1>
    </div>
    <div className="club-detail_body">
        <img src={location.imgUrl} alt={`A picture of the outside of express gym ${location.address}`} />
        <span className="club-detail_info">
            <ul>
                {location.extrasIds.map((e,i) => {
                    return (
                        <li key={e+i}>
                            <CheckIcon />
                            {e.label}
                        </li>
                    )
                })}
            </ul>
        </span>
    </div>
  </div>
  )
}

export default ClubDetail