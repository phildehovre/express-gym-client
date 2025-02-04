import {} from 'lucide-react'
import React from 'react'
import './ClubCard.css'

const ClubCard = ({location}) => {
  const [distance, setDistance] = React.useState('')

  return (
    <div className="clubcard_ctn">
      <div className="clubcard_header">
        <h1>{location.address}</h1>
        {distance && distance + ","} {location.city}, {location.country}
      </div>
      <div className="clubcard_body">
        <button onClick={() => console.log("todo: select homeclub")}>Choose homeclub</button>
      </div>
    </div>
  )
}

export default ClubCard