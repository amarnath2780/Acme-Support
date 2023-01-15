import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import axios from '../../axios';
import AuthContext from '../../Context/AuthContext';
import NavbarBanner from '../../Components/NavbarBanner';
import Banner from '../../Components/Banner';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignUp() {

    const {Userlogin,message} = useContext(AuthContext);

    const navegate = useNavigate()
    // All Department
    const [allDepart, setAllDepart] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('user');
    const [department, setDepartment] = useState('');
    const [password, setpassword] = useState('');

    const [error, setError] = useState('');


    useEffect(() => {
        Department()
        setRole('user')
    }, []);
 
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
            navegate('/login')
        }).catch((error)=>{
            
            if (error.response) {
               setError('Please enter valid data')
            }
            else{
               console.log(error);
            }
            
        })
    }

    const Department=()=>{
        axios.get('/all-department/').then((res)=>{
            setAllDepart(res.data.results)
        })
    }



  const [open, setOpen] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault() 
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <div className='LoginPage'>
      <Banner/>
      <div className='login-section'>
          <div className="Signin__details">
            <div className="Signin__part">
              <div className="Signin_section">
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

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error?{error}:'Please enter valid the details '}
        </Alert>
      </Snackbar>
    </Stack>
      
    </div>
  )
}

export default SignUp







