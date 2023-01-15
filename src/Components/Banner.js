import React from 'react'
import NavbarBanner from './NavbarBanner'

function Banner() {
  return (
    <div className='banner'>
      <div className="Header__menuWrapper">
        <NavbarBanner/>
      </div>
      <div className="titleSearch">
        <div className="Header__titleSearchBox">
            <button>Add Ticket</button>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Banner
