import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import { useLocation } from 'react-router-dom'

const SignUpPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [data, setData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const url = import.meta.env.VITE_API_URL 

    const handleLogin = async (isLoading) => {
        isLoading(true)
        try {
            const res = await fetch(url + '/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': 'no-cors',
                   'Content-Type': 'application/json' 
                },
                body: JSON.stringify({password, email})
            })
            const data = await res.json()
            setData(data)
            if (data.user) {
                navigate('/')
            }
            console.log(data)
        } catch (error) {
            console.error(error)
        } finally {
            isLoading(false)
        }

    }

    const handleRegister = async (isLoading) => {
        isLoading(true)
        try {
            const res = await fetch('http://localhost:8080/register', {
                method: 'POST',
                // Credentials must mirror cors middleware 'credentials: true'
                // with 'credentials: include' in order to allow for cookies to be sent
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': 'no-cors',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, confirmPassword })
            })
            const data = await res.json()
            setData(data)
        } catch (error) {
            console.error(error)
        }
        finally {
            isLoading(false)
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        if (pathname === '/signup') {
            handleRegister(setIsSubmitting)
        }
        if (pathname === '/login')  {
            handleLogin(setIsSubmitting)
        }

    }
const renderErrors = () => {
    if (data?.errors) {
        return Object.keys(data.errors).map(key => {
            return (
                <p key={key}>{data.errors[key]}</p>
            )
        
    })
    }
}

  return (
    <div className='signup_ctn'>
            <div className="errors">
                {renderErrors()}
            </div> 
        <form onSubmit={handleSubmit}>
            <input type='text' name='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            {pathname === '/signup' &&
                <input type='password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
            }
            <input type="submit"
                disabled={isSubmitting}
                value={isSubmitting
                        ? 'Submitting...' 
                            : pathname === '/signup' 
                                ? 'Register'
                                : 'Login'
                        }
            />
        </form>
        {pathname === '/signup' && 
            <p>Already a user?
            {' '} <a href='/login'>Login</a>
            </p>
        }
        {pathname === '/login' && 
            <p>Are you a new user?
            {' '} <a href='/signup'>Register here!</a>
            </p>
        }
    </div>
  )
}

export default SignUpPage