import React, {useEffect, useState, useContext} from 'react'
import Drawer from './Drawer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ClubFinder from './ClubFinder'
import MembershipChoice from './membershipChoice'
import useCookies from '../hooks/useCookies'
import { CheckoutContext } from '../context/Checkoutcontext'
import ClubDetail from './ClubDetail'
import DetailsForm from './DetailsForm'
import AddonsForm from './AddonsForm'

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
    const {location, setLocation} = useContext(CheckoutContext)
    const stage = searchParams.get('stage')
    
    const checkoutOrder = ['homeclub', 'membership', 'addons', 'details', 'payment']

    useEffect(() => {
        if (!location) {
            navigate('/checkout?stage=homeclub')
        }
    }, [])

    useEffect(() => {
        if (location) {
            setLocation(location)
        }
    }, [location])

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
                <Drawer.Header.Breadcrumbs isOpen={homeClub && stage !== 'homeclub' }>
                    <p>{homeClub && homeClub.name}</p>
                    <a href={`/checkout?stage=homeclub`}>Edit</a>
                </Drawer.Header.Breadcrumbs>  
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
        <Drawer>
            <Drawer.Header>
                <h1>Add-Ons</h1>
            </Drawer.Header>
            <Drawer.Body isOpen={stage == 'addons'}>
                <AddonsForm />
                <button onClick={() => navigate('/checkout?stage=details')}>Continue without addons</button>
            </Drawer.Body>
        </Drawer>
        <Drawer 
            isOpen={stage == 'details'} 
            header='Details'
            next={determineNext('details')}
        >
            <Drawer.Header>
                <h1>Your details</h1>
                <Drawer.Header.Breadcrumbs isOpen={stage !== 'details'}>

                </Drawer.Header.Breadcrumbs>
            </Drawer.Header>
            <Drawer.Body
                isOpen={stage == 'details'}
                header='Your details'
                next={determineNext('details')}
            >
                <DetailsForm />
            </Drawer.Body>
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