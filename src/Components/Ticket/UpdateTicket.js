import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import '../../Pages/Login/Login.css'
import axios from '../../axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function refreshPage() {
  window.location.reload();
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UpdateTicket({id}) {

  const userId = localStorage.getItem('userId')
  const [open, setOpen] = React.useState(false);


  // All Department
  const [allDepart, setAllDepart] = React.useState('');

  const [department, setDepartment] = React.useState('');
  const [subject, setSubject] = useState('');
  const [discription, setDiscription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  const [error, seterror] = useState('');

  const navigate = useNavigate()

  React.useEffect(() => {
      Department()
      UserDetails()
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [stack, setstack] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const Department=()=>{
    axios.get('/all-department/').then((res)=>{
        setAllDepart(res.data.results)
    })
  }

  const UserDetails=()=>{
    axios.get(`/ticket-details/${id}/`).then((res)=>{
      setEmail(res.data.email)
      setPhone(res.data.phone)
      setDepartment(res.data.department)
      setSubject(res.data.subject)
      setDiscription(res.data.description)
      setName(res.data.name)
      setPriority(res.data.priority)
      setStatus(res.data.status)
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.put(`update-ticket/${id}/`, {
      department:department,
      subject: subject,
      description : discription,
      name: name,
      email : email,
      phone : phone,
      priority : priority,
      status : status,
    }).then((res)=>{
      refreshPage()
      navigate('/')
      setOpen(false)
    }).catch((error)=>{
      if (error.response) {
        seterror('Please enter valid data')
      }
      else{
          console.log(error);
      }
    })
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update a Ticket
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Create a Ticket
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className='LoginPage'>
          <div className='login-section'>
                      <div className="Signin__details">
                        <div className="Signin__part">
                          <div className="Signin_section" style={{margin:'0px'}}>
                            <div className="Signin__title">
                                {error?<h5 style={{color:'#ee1313'}}>{error}</h5>:''}
                              <h5>Create a Ticket</h5>
                              <span></span>
                            </div>

                            <div className="Signin_form">
                            <form onSubmit={handleSubmit} >

                                <input type="text" placeholder={subject} name="subject" id='subject' 
                                    onChange={(e)=>{
                                        setSubject(e.target.value)
                                }}/>

                                <textarea type="textarea" placeholder={discription} name="description" id='description' 
                                    onChange={(e)=>{
                                        setDiscription(e.target.value)
                                }}/>

                                <input type="text" placeholder={name} name="contact_name" id='contact_name' 
                                    onChange={(e)=>{
                                        setName(e.target.value)
                                }}/>

                                <input type="email" placeholder={email} name="email" id='email' 
                                    onChange={(e)=>{
                                        setEmail(e.target.value)
                                }}/>
                                                
                                <input type="text" placeholder={phone} name="phone" id='phone' 
                                    onChange={(e)=>{
                                        setPhone(e.target.value)
                                }}/>

                                <select name="" id="" placeholder='Department' onChange={(e)=>setDepartment(e.target.value)}>
                                    <option value='1'>Department</option>
                                            {allDepart ? allDepart.map((item,key)=>
                                            <option value={item.id}>{item.name}</option>
                                            ):''}
                                </select>

                                <select name="" id="" placeholder='' onChange={(e)=>setStatus(e.target.value)}>
                                    <option value="open">Status</option>
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                    <option value="on_hold">On Hold</option>
                                </select>
                                
                                <select name="" id="" placeholder='' onChange={(e)=>setPriority(e.target.value)}>
                                    <option value="high">Priority</option>
                                    <option value="high">High - Prodiction System Dowm</option>
                                    <option value="medium">Medium - Ststem Impaired</option>
                                    <option value="low">Low - General Guidance</option>
                                </select>


                                <div className="signin_button">
                                  <button class="btn"  type="submit">Update a Ticket</button>
                                </div>
                              </form> 
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}