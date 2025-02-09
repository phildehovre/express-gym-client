import React from 'react'
import './Sheet.css'

const Sheet = (props) => {
    const {children, onScroll} = props

    const handleScroll = (e) => {
      if (onScroll) {
        onScroll(e)
      }
    }
  return (
    <div onScroll={e => handleScroll(e)} className="sheet_ctn">{children}</div>
  )
}

export default Sheet