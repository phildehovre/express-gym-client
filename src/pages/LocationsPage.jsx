import React from 'react'
import { fetchWithCredentials } from '../utils/fetchWithCredentials'
import MapComponent from '../components/Map'

const LocationsPage = () => {
  const [locations, setLocations] = React.useState([])
  const [selectedLocation, setSelectedLocation] = React.useState(undefined)


  React.useEffect(() => {
    (async() => {
       const data = await fetchWithCredentials('GET','/location')
       setLocations(data)
    })()
  }, [])
  
  const getLocation = async (id) => {
    const location = await fetchWithCredentials('GET', `/location/${id}`)
    console.log(location)
    setSelectedLocation(location)
  }

  return (
    <>
        <h1>LocationsPage</h1>
        <MapComponent 
        locations={locations} 
        getLocation={getLocation}
        />
        
    </>
  )
}

export default LocationsPage