import React from 'react'
import './Ticket.css'

function ViewTicket() {
  return (
    <div className='viewTicket'>
      <div className="Layout__layout1">
        <div className="TicketDetailLeftContainer__wrapper">
            <div className="TicketDetailLeftContainer__boxView">
                <h1>Title <span>(status)</span></h1>
                <div className="TicketThreadContainer__threadCont">
                    <div className="contact">
                        <p>Email : amarnath@gmail.com</p>
                        <p>Phone : 8848364263</p>
                    </div>
                    <div className="priority">
                        <p>Priority : High - production system Down</p>
                    </div>
                    <div className="disc">
                        <p>discriptionaskjdfhaksjdhfkajshdfkjashdkfaskdjfhksdf</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTicket
