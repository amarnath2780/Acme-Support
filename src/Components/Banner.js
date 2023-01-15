import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import ModalDialog from './Dialog/ModalDialog';
import NavbarBanner from './NavbarBanner'

function Banner() {

  const {authToken,adminToken} = useContext(AuthContext);

  return (
    <div className='banner'>
      <div className="Header__menuWrapper">
        <NavbarBanner/>
      </div>
      <div className="titleSearch">
        <div className="Header__titleSearchBox">
            {authToken ? <ModalDialog/>  : adminToken ? <>
            <button>Create Ticket</button>
            <button>Create User</button>
            </> : ''}
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Banner
