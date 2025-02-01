import React, { useState, useEffect } from 'react'
import './ClubFinder.css'
import {SearchIcon} from 'lucide-react'
import { fetchWithCredentials } from '../utils/fetchWithCredentials'

const ClubFinder = () => {
const [term, setTerm] = useState('')
const [language,setLanguage] = useState('')
const [location, setLocation] = useState('')
const [locations, setLocations] = useState([])

useEffect(() => {
    (async () => {
        console.log("term changing")
        // TODO: handle search term
    })()
}, [term])

    const success = (loc) => {
        console.log(loc)
    }
    const error = (err) => {
        console.error(err)
    }

useEffect(() => {
    (async () => {
     const locations = await fetchWithCredentials('GET', '/location')
        setLocations(locations)
    })()
    window.navigator.geolocation.getCurrentPosition(success, error)
}, [])


useEffect(() => {
    //TODO: Check cookies for location
    (async () => {
        try {
        navigator.geolocation.getCurrentPosition(async (res) => {
            const {latitude, longitude} = res.coords;
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`)
            const data = await response.json()
            const country = data.results.filter(item => item.types.includes('country'))[0].formatted_address
            setLocation(country)
            setLanguage(navigator.language)
        }, (error) => console.log(error))

        } catch (error) {
            throw new Error(error)
        }
    })()
}, [])

const renderLocations = () => {
    if (locations && locations.length > 0) {
        return locations.map((loc, i) => {
            return (
                <li className="location_btn" key={loc.name+i} id={loc._id}>{loc.city}</li>
            )
        })

    }
}

  return (

    <div className="clubfinder">
        <div className="background"></div>
        <div className="search_ctn">
                <h1>Find your club</h1>
                {/* TODO: count clubs */}
                <p className="text-dark">We have <span className="highlight">100+</span>clubs in <span className="highlight">{location}</span></p>
            <div className="searchbar">
                <input type="text" name="search" placeholder="Where would you like to train?" id="" onChange={e => setTerm(e.target.value)} value={term} />
                <SearchIcon className="search-icon" />
            </div>
            <div className="club-suggestions text-dark">
                <ul>
                    {renderLocations()}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ClubFinder