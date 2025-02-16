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
import { use } from 'react'
import { locationDummy } from '../const/locationsDummy'

var DEBUG_CHECKOUT = true

const Checkout = () => {
    const [homeClub, setHomeClub] = useState(undefined)
    const [membership, setMembership] = useState('')
    const [addons, setAddons] = useState([])
    const [continueWithSelected, setContinueWithSelected] = useState(false)
    const [details, setDetails] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)

    const [drawer, setDrawer] = useState('')
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const {setCookie, getCookie, deleteCookie} = useCookies()
    const {location, setLocation} = useContext(CheckoutContext)
    
    const checkoutOrder = ['homeclub', 'membership', 'addons', 'details', 'payment']

    useEffect(() => {
        // TODO: Check that this is still relevant.
        if (location && !homeClub) {
            setHomeClub(location)
        }
    }, [location])

    useEffect(() => {
        if (DEBUG_CHECKOUT) {
            setHomeClub(locationDummy)
        }
    }, [])



    // console.log('Location: ', location)
    // console.log('club: ', homeClub)

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams)
        const drawer = newParams.get('drawer')

        const membershipType = getCookie('type')
        const selectedClub = getCookie('club') 

        if (membershipType) {
            setMembership(membershipType)
        }

        if (selectedClub || location) {
            setHomeClub(selectedClub || location)
        }

    }, [drawer])

      const handleMembershipselection = (membershipType) => {
        deleteCookie('type')
        setCookie('type', membershipType)
        setMembership(membershipType)
        setDrawer('addons')
    }

    const handleHomeClubSelection = async (location) => {
        setHomeClub(location)
        setLocation(location)
        deleteCookie('location', location)
        setCookie('location', location)
        setDrawer('membership')
    }

    const handleContinueWithoutExtras = () => {
        setContinueWithSelected(true)
        setDrawer('details')
    }
    const determineNext = (drawerName) => {
        const next = checkoutOrder[checkoutOrder.indexOf(drawerName) + 1]
        if (next) {
            return next
        }
    }

    const handleOpenDrawer =(drawerName) => {
        setDrawer(determineNext(drawerName))
    }

    const handleDetailsForm = (data) => {
        setDetails(data)
        setDrawer('payment')
    }

  return (
    <div>
        <Drawer> 
            <Drawer.Header >
                <h1>Select your home club</h1>
                <Drawer.Header.Breadcrumbs isOpen={drawer !== 'homeclub' }>
                    <p>{homeClub && homeClub.name}</p>
                    <p onClick={() => setDrawer('homeclub')}>Edit</p>
                </Drawer.Header.Breadcrumbs>  
            </Drawer.Header>
            <Drawer.Body isOpen={drawer == 'homeclub'}>
                <ClubFinder 
                    onSelect={handleHomeClubSelection} 
                    selectedClub={homeClub}
                />
                {homeClub && <ClubDetail location={homeClub}/>}
            </Drawer.Body>
            <Drawer.Footer isOpen={drawer == 'homeclub'}>
                <button onClick={() => handleOpenDrawer('homeclub')} disabled={!homeClub}>NEXT</button>
            </Drawer.Footer>
        </Drawer>
        <Drawer>
            <Drawer.Header>
                <h1>Membership</h1>
                {
                    membership && drawer !== 'membership' && 
                    <>
                        <p>{membership} membership</p>
                        <p onClick={() => setDrawer('membership')}>Edit</p>
                    </>
                }
            </Drawer.Header>
            <Drawer.Body isOpen={drawer === 'membership'}>
                <MembershipChoice onSelectCallback={handleMembershipselection}/>
            </Drawer.Body>
            <Drawer.Footer isOpen={drawer === 'membership'}></Drawer.Footer>
        </Drawer>
        <Drawer>
            <Drawer.Header>
                <h1>Add-Ons</h1>
                { continueWithSelected &&
                    <Drawer.Header.Breadcrumbs
                        isOpen={drawer !== addons}
                    >
                    <p onClick={() => setDrawer('addons')}></p>
                    </Drawer.Header.Breadcrumbs>
                }
            </Drawer.Header>
            <Drawer.Body isOpen={drawer== 'addons'}>
                <AddonsForm homeClub={homeClub} addons={addons} setAddons={setAddons}/>
                <button onClick={() => handleContinueWithoutExtras()}>
                    {
                        addons.length > 0  ?
                            'Continue with selected'
                            : 'Continue without add-ons'
                    }
                </button>
            </Drawer.Body>
        </Drawer>
        <Drawer 
            isOpen={drawer == 'details'} 
            header='Details'
            next={determineNext('details')}
        >
            <Drawer.Header>
                <h1>Your details</h1>
                <Drawer.Header.Breadcrumbs isOpen={drawer !== 'details'}>

                </Drawer.Header.Breadcrumbs>
            </Drawer.Header>
            <Drawer.Body
                isOpen={drawer == 'details'}
                header='Personnal details'
            >
                <DetailsForm 
                    setDetails={setDetails} 
                    setDrawer={setDrawer} 
                    details={details} 
                    onSubmit={handleDetailsForm}
                />
            </Drawer.Body>
        </Drawer>
        <Drawer 
            isOpen={drawer == 'payment'} 
            header='Payment method'
            next={determineNext('payment')}
        >
            <Drawer.Header>
                <h1>Payment</h1>
            </Drawer.Header>
            <Drawer.Body isOpen={drawer == 'payment'}>
                <h2>Is open</h2>
            </Drawer.Body>
        </Drawer>
    </div>
  )
}

export default Checkout