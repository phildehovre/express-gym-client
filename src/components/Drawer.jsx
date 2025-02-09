import React from 'react'
import './drawer.css'
import { ChevronRight } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Drawer = ({children}) => {

  return (
        <div className="drawer">
            {children}
        </div>
    )
    }

const Header = ({children}) => {
        return (
                <div className="header_ctn">
                    <ChevronRight/>
                {children}
                </div>
        )
}

const Body = ({children, isOpen}) => {
    if (isOpen) {
        return (
            <div className="body_ctn">
                {children}
            </div>
        )
    }
}

const Footer =  ({children, isOpen}) => {
    return (
        <div className="footer_ctn">
            {isOpen && children}
        </div>
    )
}

Drawer.Header = Header
Drawer.Body = Body
Drawer.Footer = Footer

export default Drawer