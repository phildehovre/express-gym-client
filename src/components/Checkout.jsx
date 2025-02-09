import React, {useEffect, useState, useContext} from 'react'
import Drawer from './Drawer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ClubFinder from './ClubFinder'
import MembershipChoice from './membershipChoice'
import useCookies from '../hooks/useCookies'
import { CheckoutContext } from '../context/Checkoutcontext'
import ClubDetail from './ClubDetail'

const Checkout = () => {
    const [homeClub, setHomeClub] = useState(undefined)
    const [membership, setMembership] = useState('')
    const [addons, setAddons] = useState([])
    const [continueWithSelected, setContinueWithSelected] = useState(false)
    const [details, setDetails] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const {setCookie, getCookie, deleteCookie} = useCookies()
    const {location} = useContext(CheckoutContext)
    const stage = searchParams.get('stage')
    
    const checkoutOrder = ['homeclub', 'membership', 'addons', 'details', 'payment']

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams)
        const stage = newParams.get('stage')

        const membershipType = getCookie('type')
        const selectedClub = getCookie('club') 

        if (!stage) {
            newParams.set('stage', 'homeclub')
            navigate(`?${newParams.toString()}`)
        }

        if (membershipType) {
            setMembership(membershipType)
        }

        if (selectedClub || location) {
            setHomeClub(selectedClub || location)
        }

    }, [stage])
    console.log(homeClub)

    const handleMembershipselection = (membershipType) => {
        deleteCookie('type')
        setCookie('type', membershipType)
        setMembership(membershipType)
        navigate(`/checkout?stage=addons`)
    }

    const handleHomeClubSelection = (location) => {
        setHomeClub(location)
        setCookie('club', location)
    }

    const determineNext = (header) => {
        const next = checkoutOrder[checkoutOrder.indexOf(header) + 1]
        if (next) {
            return next
        }
    }
  return (
    <div>
        <Drawer> 
            <Drawer.Header >
                <h1>Select your home club</h1>
                {
                    homeClub && stage !== 'homeclub' && 
                    <>
                        <p>{homeClub.name}</p>
                        <a href={`/checkout?stage=homeclub`}>Edit</a>
                    </>
                }
            </Drawer.Header>
            <Drawer.Body isOpen={stage == 'homeclub'}>
                <ClubFinder 
                    onSelect={handleHomeClubSelection} 
                    selectedClub={homeClub}
                />
                {homeClub && <ClubDetail location={homeClub}/>}
            </Drawer.Body>
            <Drawer.Footer isOpen={stage == 'homeclub'}>
                <button onClick={() => {navigate(`/checkout?stage=membership`)}} disabled={!homeClub}>NEXT</button>
            </Drawer.Footer>
        </Drawer>
        <Drawer>
            <Drawer.Header>
                <h1>Membership</h1>
                {
                    membership && stage !== 'membership' && 
                    <>
                        <p>{membership} membership</p>
                        <a href={`/checkout?stage=membership`}>Edit</a>
                    </>
                }
            </Drawer.Header>
            <Drawer.Body isOpen={stage === 'membership'}>
                <MembershipChoice onSelectCallback={handleMembershipselection}/>
            </Drawer.Body>
            <Drawer.Footer isOpen={stage === 'membership'}></Drawer.Footer>
        </Drawer>
        <Drawer 
            isOpen={stage == 'addons'} 
            header='Add-ons'
            next={determineNext('addons')}
        >
            <h1>Addons</h1>
            <button onClick={() => navigate('/checkout?stage=details')}>Continue without addons</button>
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