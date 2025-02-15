import React, { useState, useEffect, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { fetchWithCredentials } from '../utils/fetchWithCredentials'
import MapComponent from '../components/Map'
import Clubs from '../components/Clubs'
import Sheet from '../components/Sheet'
import Spinner from '../components/Spinner'
import ClubCard from '../components/ClubCard'
import { CheckoutContext } from '../context/Checkoutcontext'

const LocationsPage = () => {
  const PAGE_URL = '/clubs'
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(undefined)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [fetching,setFetching] = useState(false)
  const [paginate, setPaginate] = useState({g: 0, s: 0})

  const {location, setLocation} = useContext(CheckoutContext)


  /**
   * GET locations near user
   */
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        async (loc) => {
          const range = 55
          const {longitude, latitude} = loc.coords 
            const locations = await fetchWithCredentials('GET', `/location/near?lng=${longitude}&lat=${latitude}&rng=${range}`)
          setLocations(locations)
          setPaginate(prev => { return {...prev, s: locations.length}}) // Set pagination size to account for initial locations GET call
      }, (error) => console.error(error));
  }, [])

  /**
   * Handle pagination/infinite scroll
   */
  useEffect(() => {
      if (scrollPosition === 100) {
        setFetching(true)
        setPaginate(prev => {
          return {g: prev.g +1, s: prev.s + 5}
        })

      if (!fetching) {
        (async () => {
            const data = await fetchWithCredentials('GET', `/location?g=${paginate.g}&s=${paginate.s}`)
            console.log(data)
          }
        )()
        }
      }
  }, [scrollPosition])

  const handleClubsScroll = (e) => {
    const {scrollHeight, clientHeight, scrollTop} = e.target
    const position = Math.ceil((
      scrollTop / (scrollHeight - clientHeight) * 100
    ))
    setScrollPosition(position)
  }

  const filteredLocations = () => {
    if (location) {
      return locations.filter(loc => loc._id !== location._id)
    }
    return locations
  }
  return (
    <div className="responsive_page" style={{height: '100svh'}}>
        <MapComponent locations={locations} selectLocation={setLocation} />
        <Sheet onScroll={handleClubsScroll}>
          {location && <ClubCard location={location} />}
          <Clubs locations={filteredLocations()} />
          <div style={{height: '5em', overflow: 'hidden', color: 'var(--clr-accent-primary)'}}>
            {fetching && <Spinner /> }
          </div>
        </Sheet>
    </div>
  )
}

export default LocationsPage