import React, {useEffect, useState, useContext} from 'react'
import Drawer from './Drawer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import useCookies from '../hooks/useCookies'
import { CheckoutContext } from '../context/Checkoutcontext'
import { locationDummy } from '../const/locationsDummy'
import ClubFinder from './ClubFinder'
import MembershipChoice from './membershipChoice'
import ClubDetail from './ClubDetail'
import DetailsForm from './DetailsForm'
import AddonsForm from './AddonsForm'
import PaymentForm from './PaymentForm'
import './Checkout.css'
import { useApiCall } from '../services/membership'
import { createUser, createMembership } from '../services/membership'

const Checkout = () => {
    const [homeClub, setHomeClub] = useState(undefined)
    const [membership, setMembership] = useState('')
    const [addons, setAddons] = useState([])
    const [continueWithSelected, setContinueWithSelected] = useState(false)
    const [details, setDetails] = useState(null)
    const [paymentDetails, setPaymentDetails] = useState(null)
    const [drawer, setDrawer] = useState('')
    const [completed, setCompleted] = useState([])

    const navigate = useNavigate()
    const {setCookie, getCookie, deleteCookie} = useCookies()
    const {execute: exeUser, isLoading: isUserLoading, userError} = useApiCall(createUser)
    const {execute: exeMembership, isLoading: isMembershipLoading, membershipError} = useApiCall(createMembership)
    const {location, setLocation} = useContext(CheckoutContext)

    const checkoutSequence = ['homeclub', 'membership', 'addons', 'details', 'payment']
    
    useEffect(() => {
        // TODO: Check that this is still relevant.
        if (location && !homeClub) {
            setHomeClub(location)
        }
    }, [location])

    // useEffect(() => {
    //     if (import.meta.env.VITE_DEBUG_ON) {
    //         setHomeClub(locationDummy)
    //     }
    // }, [])

    useEffect(() => {
        checkoutSequence.forEach((stage, index) => {
            if (completed.includes(stage) && index < completed.length -1) {
                console.log('updating drawer')
                setDrawer(checkoutSequence[index])
            }
        })

    }, [completed])

    // useEffect(() => {
    //     const membershipType = getCookie('type')
    //     const selectedClub = getCookie('club') 

    //     if (membershipType) {
    //         setMembership(membershipType)
    //     }

    //     if (selectedClub || location) {
    //         setHomeClub(selectedClub || location)
    //     }

    // }, [drawer])

      const handleMembershipselection = (membershipType) => {
        deleteCookie('type')
        setCookie('type', membershipType)
        setMembership(membershipType)
        setCompleted(prev => [...prev, 'membership'])
        setDrawer('addons')
    }

    const handleHomeClubSelection = async (location) => {
        setHomeClub(location)
        setLocation(location)
        setCompleted(prev => [...prev, 'homeclub'])
        deleteCookie('location', location)
        setCookie('location', location)
        setDrawer('membership')
    }

    const handleContinueWithoutExtras = () => {
        setContinueWithSelected(true)
        setCompleted(prev => [...prev, 'addons'])
        setDrawer('details')
    }

    const handleDetailsForm = (data) => {
        setDetails(data)
        setCompleted(prev => [...prev, 'details'])
        setDrawer('payment')
    }

    const handleSubmitRegistration = async (data) => {
        const userData = {
            email: data.email,
            password: data.password
        }
        const membershipData = {
            type: membership,
            startDate: new Date(),
            active: true,
            owner: user._id,
            // TODO: calculate correct date
            endDate: new Date(),
            location: homeClub
        }
        try {
            const user = await exeUser(userData)

            if (!user) {
                throw new Error("User creation failed");
            }
            const membership = await exeMembership(membershipData)

            if (!membership) {
                throw new Error("Membership creation failed")
            }

            console.log(user, membership)
            if (user && membership) {
                navigate('/')
            }
        } catch (err) {
            console.error(err)
        }     
    }

  return (
    <div className="checkout_ctn">
        <Drawer> 
            <Drawer.Header>
                    <h1>Select your home club</h1>
                <Drawer.Header.Breadcrumbs isOpen={drawer !== 'homeclub' }>
                    <p>{homeClub && homeClub.name}</p>
                    <button onClick={() => setDrawer('homeclub')}>Edit</button>
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
                <button onClick={() => setDrawer('membership')} disabled={!homeClub}>NEXT</button>
            </Drawer.Footer>
        </Drawer>
        <Drawer>
            <Drawer.Header>
                <h1>Membership</h1>
                <Drawer.Header.Breadcrumbs isOpen={membership && drawer !== 'membership'}>
                        <p>{membership} membership</p>
                        <button className="breadcrumb_btn" onClick={() => setDrawer('membership')}>Edit</button>

                </Drawer.Header.Breadcrumbs>
            </Drawer.Header>
            <Drawer.Body isOpen={drawer === 'membership'}>
                <MembershipChoice onSelectCallback={handleMembershipselection}/>
            </Drawer.Body>
            <Drawer.Footer isOpen={drawer === 'membership'}></Drawer.Footer>
        </Drawer>
        <Drawer>
            <Drawer.Header>
                <h1>Add-Ons</h1>
                    <Drawer.Header.Breadcrumbs
                        isOpen={drawer !== 'addons'}
                    >
                    <button className="breadcrumb_btn" onClick={() => setDrawer('addons')}>Edit</button>
                    </Drawer.Header.Breadcrumbs>
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
        <Drawer>
            <Drawer.Header>
                <h1>Your details</h1>
                <Drawer.Header.Breadcrumbs isOpen={drawer !== 'details'}>
                    <button className="breadcrumb_btn" onClick={() => setDrawer('details')}>Edit</button>
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
        <Drawer>
            <Drawer.Header>
                <h1>Payment</h1>
                <Drawer.Header.Breadcrumbs isOpen={drawer !== 'payment'}>
                    <button className="breadcrumb_btn" onClick={() => setDrawer('payment')}>Edit</button>
                </Drawer.Header.Breadcrumbs>
            </Drawer.Header>
            <Drawer.Body isOpen={drawer == 'payment'}>
                    <PaymentForm 
                        onSubmit={handleSubmitRegistration} 
                        paymentDetails={paymentDetails}
                    />
            </Drawer.Body>
        </Drawer>
    </div>
  )
}

export default Checkout