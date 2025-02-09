import { CheckCircle } from 'lucide-react'
import React, { useEffect, useState, useContext } from 'react'
import './ClubCard.css'
import {CheckoutContext} from '../context/Checkoutcontext'
import { useNavigate } from 'react-router-dom'


const ClubCard = ({location, onSelect, selectedClub}) => {
  const [distance, setDistance] = React.useState('')
  const [selected, setSelected] = React.useState(null)

  const {setLocation} = useContext(CheckoutContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (selectedClub && location._id === selectedClub._id) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [selectedClub])

  const renderExtras = () => {
    return location.extrasIds.map((e, i) => {
      return <li key={e.label+i} title={e.description} className="extra" >
        <CheckCircle size={16}/>
        {e.label}
      </li>
    })
  }

  const handleHomeClubSelection = (location) => {
    setLocation(location)
    navigate('/checkout')
  }

  return (
    <div className={`clubcard_ctn ${selected && 'selected'}`}>
        <div className="clubcard_header">
          <h1>{location.address}</h1>
          {distance && distance + ","} {location.city}, {location.country}
        </div>
        <div className="clubcard_body">
      <div className="clubcard_left">
        <img src={location.imgUrl} alt="" />
      </div>
      <div className="clubcard_right">
        <h2>Available extras:</h2>
        <ul>
          {renderExtras()}
        </ul>
        </div>
      </div>
        <div className="clubcard_footer">
          <button onClick={() => handleHomeClubSelection(location)}>Choose homeclub</button>
        </div>
    </div>
  )
}

export default ClubCard