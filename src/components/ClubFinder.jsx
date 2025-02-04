import React, { useState, useEffect } from 'react'
import './ClubFinder.css'
import {Loader, SearchIcon} from 'lucide-react'
import { fetchWithCredentials } from '../utils/fetchWithCredentials'
import ClubCard from './ClubCard'
import Spinner from './Spinner'

const ClubFinder = () => {
const [term, setTerm] = useState('')
const [language,setLanguage] = useState('')
const [location, setLocation] = useState('')
const [locations, setLocations] = useState([])
const [locSuggestions, setLocSuggestions] = useState([])
const [currentPosition, setCurrentPosition] = useState([])
const [selectedRange, setSelectedRange] = useState(55)

const DEBOUNCE_DELAY = 500; 

useEffect(() => {
    const handler = setTimeout(async () => {
        if (term) {
            const data = await fetchWithCredentials('GET', `/location?q=${term}`);
            setLocations(data)
        }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler); 
}, [term]);

/** 
 * Initialize user GeoLocation
 */
useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
        loc => setCurrentPosition(loc.coords), 
        err => console.error(err)) 
}, [])

/**
 * Once user coordinates are set
 * fetch nearby locations
 */
useEffect(() => {
    const {latitude, longitude} = currentPosition
    const RANGE = selectedRange || 55 
    
    if (currentPosition.latitude && currentPosition.longitude) {
        (async () => {
            const locations = await fetchWithCredentials('GET', `/location/near?lng=${longitude}&lat=${latitude}&rng=${RANGE}`)
            setLocSuggestions(locations)
            if (locations.length > 0) {
                setTerm('')
        }
        })()
    }
}, [currentPosition, selectedRange])


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
    if (locSuggestions && locSuggestions.length > 0) {
        return locSuggestions.map((loc, i) => {
            return (
                <li className="location_btn" key={loc.name+i} id={loc._id}>{loc.city}</li>
            )
        })

    }
}

const renderClubCards = () => {
    if (locations && locations.length > 0) {
        return locations.map((loc, i) => {
            return (
                <ClubCard className="location_btn" key={loc.name+i} location={loc} />
            )
        })
    } else {
        return <Spinner />
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
        <div className='clubcards_ctn'>
            {term && locations.length == 0 &&
                    <Spinner />
            }
            {term && locations.length> 0 &&
                renderClubCards()
            }

        </div>
    </div>
  )
}

export default ClubFinder