import React from 'react'
import Spinner from './Spinner'
import ClubCard from './ClubCard'

const Clubs = (props) => {
    const {locations } = props

    const renderClubCards = () => {
    if (locations && locations.length > 0) {
        return locations.map((loc, i) => {
            return (
                <ClubCard 
                    className="location_btn" 
                    key={loc.name+i} 
                    location={loc} 
                    onSelect={props.onSelect}
                    selectedClub={props.selectedClub}
                />
            )
        })
    } else {
        return <Spinner />
    }
}


  return (
    <>
        {renderClubCards()}
    </>
  )
}

export default Clubs