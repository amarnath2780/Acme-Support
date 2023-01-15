import React from 'react'
import './Ticket.css'
import UpdateTicket from './UpdateTicket'

function ViewTicket({item}) {
  return (
    <div className='viewTicket'>
      <div className="Layout__layout1">
        <div className="TicketDetailLeftContainer__wrapper">
            <div className="TicketDetailLeftContainer__boxView">
                <div className="title">
                    <h3>{item.subject} {item.status == 'open' ? <span id='success'>({item.status})</span> : item.status == 'closed' ? <span id='closed'>({item.status})</span> : <span id='pending'>({item.status})</span> }</h3>
                    <h4>#{item.id}</h4>
                </div>
                <div className="TicketThreadContainer__threadCont">
                    <div className="contact">
                        <p><span id='important'>Name</span>  : {item.name} </p>
                        <p><span id='important'>Email</span> : {item.email}</p>
                        <p><span id='important'>Phone</span> : {item.phone}</p>
                    </div>
                    <div className="priority">
                        <p><span id='important'>Priority</span> : {item.priority}</p>
                    </div>
                    <div className="disc">
                        <label htmlFor=""></label>
                        <p><span id='important'>Description</span> : {item.description}</p>
                    </div>

                    <div className="editing">
                        <UpdateTicket id={item.id}/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTicket
