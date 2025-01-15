import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
      <header>
        <nav>
          <div className="logo">Logo</div>
          <ul className="links">
            <li>
            <Link to='/' >Home</Link>
            </li>
            <li>
              <Link to='/about' >About</Link>
            </li>
            <li>
              <a href="">Products</a>
            </li>
            <li>
              <Link to='/signup' >Sign up</Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default Header