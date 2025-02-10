import React, { useContext } from 'react'
import {APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps'
import { styles } from '../const/styles'
import './MapWrapper.css'
import { CheckoutContext } from '../context/Checkoutcontext'

const MapComponent = ({locations, selectLocation}) => {
    const [isLoaded, setIsLoaded] = React.useState(false)

    const {location, setLocation} = useContext(CheckoutContext)

    const renderMarkers = () => {
        return locations.map((loc, i) => {
            const [lng, lat] = loc.geolocation.coordinates
            return (
                <AdvancedMarker
                    key={loc.name+i} 
                    position={{lat, lng}}
                    onClick={() => {setLocation(loc)}}
                >
                    <Pin 
                        background={styles.clrAccentPrimary} 
                        glyphColor={styles.clrAccentSecondary} 
                        borderColor={styles.clrAccentSecondary} 
                    />
                </AdvancedMarker>
            )
        })
    }
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => setIsLoaded(true)} onError={() => setIsLoaded(false)}>
        <div className="map_wrapper">
            <Map
                defaultZoom={8}
                defaultCenter={{lat: 50.5, lng: 5.2}}
                style={{width: '100%', height: '100%', aspectRatio: '16/9'}}
                mapId='EXPRESS-GYM-MAP'
            >
                { locations.length > 0 && renderMarkers()}
            </Map>
        </div>
    </APIProvider>
  )
}

export default MapComponent