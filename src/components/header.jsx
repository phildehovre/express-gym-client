import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
      <header>
        <nav className="nav desktop">
        <div className="logo">Logo</div>
          <ul className="links">
            <li>
            <Link to='/' >Home</Link>
            </li>
            <li>
              <Link to='/clubs' >Our clubs</Link>
            </li>
            <li>
              <a href="">Products</a>
            </li>
            <li>
              <Link to='/signup' >Sign up</Link>
            </li>
          </ul>
        </nav>
        <nav className="nav mobile">
          <div className="logo">Logo</div>
          <ul className="links">
            <li>
            <Link to='/' >Home</Link>
            </li>
            <li>
              <Link to='/clubs' >Our clubs</Link>
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