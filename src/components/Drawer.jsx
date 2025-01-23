import React from 'react'
import './drawer.css'
import { ChevronRight } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Drawer = ({children, isOpen, header, next}) => {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const updateUrl = () => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('stage', next)
        navigate(`?${newParams.toString()}`)
    }

    const renderHeader = () => {
        return (
                <div className="header_ctn">
                    <ChevronRight/>
                    <h4>{header}</h4>
                </div>
        )
    }

    const renderChildren = () => {
        return (
            <>
                {children}
                <button onClick={() => updateUrl()}></button>
            </>
        )
    }

  return (
    <div className="drawer">
        {isOpen? renderChildren(): renderHeader()}
    </div>
  )
}

export default Drawer