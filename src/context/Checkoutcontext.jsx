import React, {useEffect, createContext, useState } from 'react'
import useCookies from '../hooks/useCookies';

export const CheckoutContext = createContext();

 const CheckoutProvider = ({children}) => {
    const [location, setLocation] = useState()
    const [membership, setMembership] = useState()

    const value = {
        location, 
        setLocation,
        membership,
        setMembership
    }

    const {setCookie, getCookie} = useCookies()

    //  TODO: setCookie on location selection
    //  TODO: cookieCleanup!!!!!!
  return (
    <CheckoutContext.Provider value={value}>
        {children}
    </CheckoutContext.Provider>
  )
}

export default CheckoutProvider