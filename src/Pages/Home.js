import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import ViewTicket from '../Components/Ticket/ViewTicket'
import axios from '../axios';

function Home() {

  const userId = localStorage.getItem('userId')

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    TicketView()
  }, []);

  const TicketView = () =>{
    axios.get(`user-view-ticket/${userId}/`).then((res)=>{
      setTickets(res.data)
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

export default Home
