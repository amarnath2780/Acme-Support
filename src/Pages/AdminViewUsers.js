import React from 'react'
import Banner from '../Components/Banner'
import UsersTable from '../Components/UsersTable'

function AdminViewUsers() {
  return (
    <div className='adminviewusers'>
      <Banner/>
      <UsersTable/>
    </div>
  )
}

export default AdminViewUsers
