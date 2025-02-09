import React, { createContext, useState } from 'react'

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
console.log(location)

  return (
    <CheckoutContext.Provider value={value}>
        {children}
    </CheckoutContext.Provider>
  )
}

export default CheckoutProvider