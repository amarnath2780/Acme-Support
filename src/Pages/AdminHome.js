import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import ViewTicket from '../Components/Ticket/ViewTicket'
import axios from '../axios';

function AdminHome() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    TicketView()
  }, []);

  const TicketView = () =>{
    axios.get('/all-tickets/').then((res)=>{
      setTickets(res.data.results)
    })
  }
  return (
    <div>
      <Banner/>
      {tickets? tickets.map((item,ket)=>
      <ViewTicket item={item}/>
      ) : ''}
    </div>
  )
}

export default AdminHome
