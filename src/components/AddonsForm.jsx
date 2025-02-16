import React from 'react'

const AddonsForm = (props) => {
  const {homeClub, addons, setAddons} = props

  const handleSetAddons = (addonId, bool) => {
    if (bool && !addons.find(a => a._id == addonId)) {
      setAddons(prev => [...prev, addonId])
    } 

    if (!bool) {
      setAddons(prev => prev.filter(a => a !== addonId))
    }
  }
  
  const renderAddons = () => {
    return homeClub?.extrasIds.map((item, index) => {
      return (
        <li key={item._id}>
          <label htmlFor={item.label}>
            <input type="checkbox" onClick={(e) => handleSetAddons(item._id, e.target.checked)} name={item.label} id={item.label} />
          </label>
          {item.label}
          <p>{item.description}</p>
        </li>
      )
    })
  }

  return (
    <div className="addons-form_ctn">
      {renderAddons()}
    </div>
  )
}

export default AddonsForm