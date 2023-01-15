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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateUser() {

  const userId = localStorage.getItem('userId')
  const [open, setOpen] = React.useState(false);


  // All Department
  const [allDepart, setAllDepart] = React.useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');
  const [department, setDepartment] = useState('');
  const [password, setpassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate()

  React.useEffect(() => {
    Department()
    setRole('user')
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
    axios.get(`/user/view/${userId}/`).then((res)=>{
      setemail(res.data.email)
      setPhone(res.data.phone_number)
    })
  }

  const handleSingup=(e)=>{
    e.preventDefault() 
    axios.post('/user/signup/',{
        first_name:firstName,
        last_name: lastName,
        email : email,
        phone_number : phone,
        role : role,
        department:department,
        password:password,
    }).then((res)=>{
        navigate('/admin')
        setOpen(false)
    }).catch((error)=>{
        
        if (error.response) {
           setError('Please enter valid data')
        }
        else{
           console.log(error);
        }
        
    })
}

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create User
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
                        <div style={{margin:'0px'}} className="Signin_section">
                            <div className="Signin__title">
                                {error?<h5 style={{color:'#ee1313'}}>{error}</h5>:''}
                            <h5>Sign Up</h5>
                            <span>Create an account to submit tickets, read articles and engage in our community</span>
                            </div>

                            <div className="Signin_form">
                            <form onSubmit={handleSingup} >

                                <input type="text" placeholder='First Name' name="first_name" id='first_name' 
                                    onChange={(e)=>{
                                        setFirstName(e.target.value)
                                }}/>

                                <input type="text" placeholder='Last Name' name="last_name" id='last_name' 
                                    onChange={(e)=>{
                                        setLastName(e.target.value)
                                }}/>

                                <input type="email" placeholder='Email' name="email" id='email' 
                                    onChange={(e)=>{
                                        setemail(e.target.value)
                                }}/>
                                                
                                <input type="text" placeholder='Mobile Number' name="phone" id='phone' 
                                    onChange={(e)=>{
                                        setPhone(e.target.value)
                                }}/>

                                <select name="" id="" placeholder='Department' onChange={(e)=>setDepartment(e.target.value)}>
                                    <option value='1'>Department</option>
                                            {allDepart ? allDepart.map((item,key)=>
                                            <option value={item.id}>{item.name}</option>
                                            ):''}
                                </select>

                                <input type="password" placeholder='Password' name="password" id="password"
                                onChange={(e)=>{
                                    setpassword(e.target.value)
                                }}
                                />


                                <div className="signin_button">
                                <button class="btn"  type="submit">Sign Up</button>
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