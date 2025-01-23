import React, {useEffect, useState} from 'react'
import { useNavigate  } from 'react-router-dom'
import MembershipChoice from '../components/membershipChoice'

const MembershipPage = () => {
    const [membership, setMembership] = useState(undefined)

    const navigate = useNavigate()

    const getMembership = async () => {
        const res = await fetch(import.meta.env.VITE_DEV_API_URL +'/membership', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': 'no-cors'
            }
        })
        if (res.status === 403) {
            navigate('/login')
            return;
        }
        const data = await res.json()
        setMembership(data)
        }
    useEffect( () => {
        getMembership()

    }, [])

  return (
    <>
        <MembershipChoice />
    </>
  )
}

export default MembershipPage