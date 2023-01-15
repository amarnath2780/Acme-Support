import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import AuthContext from '../../Context/AuthContext';
import NavbarBanner from '../../Components/NavbarBanner';
import Banner from '../../Components/Banner';
import SnackBar from '../../Components/Snackbar/SnackBar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {

    const {Userlogin,message} = useContext(AuthContext);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
 
    const handleLogin=(e)=>{
        e.preventDefault() 
        Userlogin(email,password)  
        if (message){
          setOpen(true);
        }
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
                  <h5>Already a member?</h5>
                  <span>Sign In</span>
                </div>

                <div className="Signin_form">
                <form onSubmit={handleLogin} >

                    <input type="email" placeholder='Email' name="email" id='email' 
                    onChange={(e)=>{
                        setemail(e.target.value)
                    }}/>

                    <input type="password" placeholder='Password' name="password" id="password"
                    onChange={(e)=>{
                        setpassword(e.target.value)
                    }}
                    />

                    <div className="signin_button">
                      <button class="btn"  type="submit">Sign in</button>
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
          Username or Password is not valid
        </Alert>
      </Snackbar>
    </Stack>
      
    </div>
  )
}

export default Login







