import React, {useEffect, useState} from 'react'
import Drawer from './Drawer'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Checkout = () => {
    const [homeClub, setHomeClub] = useState('')
    const [membership, setMembership] = useState('')
    const [addons, setAddons] = useState([])
    const [continueWithSelected, setContinueWithSelected] = useState(false)
    const [details, setDetails] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const stage = searchParams.get('stage')
    const checkoutOrder = ['homeclub', 'membership', 'addons', 'details', 'payment']

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams)
        const stage = newParams.get('stage')
        if (!stage) {
            newParams.set('stage', 'homeclub')
            navigate(`?${newParams.toString()}`)
        }
    }, [])

    const determineNext = (header) => {
        const next = checkoutOrder[checkoutOrder.indexOf(header) + 1]
        if (next) {
            return next
        }
    }
  return (
    <div>
        <Drawer 
            isOpen={stage === 'homeclub'} 
            header='Homeclub'
            next={determineNext('homeclub')}
        > 
            <h1>Homeclub</h1>
        </Drawer>
        <Drawer 
            isOpen={stage == 'membership'} 
            header='Membership'
            next={determineNext('membership')}
        >
            <h1>Membership</h1>
        </Drawer>
        <Drawer 
            isOpen={stage == 'addons'} 
            header='Add-ons'
            next={determineNext('addons')}
        >
            <h1>Addons</h1>
            <button onClick={() => setContinueWithSelected(!continueWithSelected)}>Continue without addons</button>
        </Drawer>
        <Drawer 
            isOpen={stage == 'details'} 
            header='Details'
            next={determineNext('details')}
        >
            <h1>Your details</h1>
        </Drawer>
        <Drawer 
            isOpen={stage == 'payment'} 
            header='Payment method'
            next={determineNext('payment')}
        >
            <h1>Payment method</h1>
        </Drawer>
    </div>
  )
}

export default Checkout