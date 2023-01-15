import React, { useContext, useState } from 'react'
import './Login.css'
import AuthContext from '../../Context/AuthContext';
import NavbarBanner from '../../Components/NavbarBanner';
import Banner from '../../Components/Banner';

function Login() {

    const {Userlogin,message} = useContext(AuthContext);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
 
    const handleLogin=(e)=>{
        e.preventDefault() 
        Userlogin(email,password)  
    }


  return (
    <div className='LoginPage'>
      <Banner/>
      <form onSubmit={handleLogin} >
        {message? <h1>{message}</h1> :''}
        <label htmlFor="">Email</label>
        <input type="email" name="email" id='email' 
        onChange={(e)=>{
            setemail(e.target.value)
        }}/>
        <label htmlFor="">Password</label>
        <input type="password" name="password" id="password"
        onChange={(e)=>{
            setpassword(e.target.value)
        }}
         />

        <button class="btn"  type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Login
