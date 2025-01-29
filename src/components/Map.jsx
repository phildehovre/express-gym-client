import React from 'react'
import {APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps'
import { styles } from '../const/styles'
import {useNavigate} from 'react-router-dom'

const MapComponent = ({locations, getLocation}) => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const navigate = useNavigate()

    const renderMarkers = () => {
        return locations.map((loc, i) => {
            const [lng, lat] = loc.coordinates
            return (
                <AdvancedMarker
                    key={loc.name+i} 
                    position={{lat, lng}}
                    onClick={() => {getLocation(loc._id)}}
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
        <Map
            defaultZoom={8}
            defaultCenter={{lat: 50.5, lng: 5.2}}
            style={{width: '100svw', height: 'auto', aspectRatio: '16/9'}}
            mapId='EXPRESS-GYM-MAP'
        >
            {renderMarkers()}
        </Map>
    </APIProvider>
  )
}

export default MapComponent