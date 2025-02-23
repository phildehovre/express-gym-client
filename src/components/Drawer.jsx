import React from 'react'
import './drawer.css'
import { ChevronRight } from 'lucide-react'

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

const Breadcrumbs =  ({children, isOpen}) => {
    return (
        <div className="breadcrumbs_ctn">
            {isOpen && children}
        </div>
    )
}

Drawer.Header = Header
Drawer.Body = Body
Drawer.Footer = Footer
Drawer.Header.Breadcrumbs = Breadcrumbs

export default Drawer