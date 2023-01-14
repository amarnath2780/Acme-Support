import React, { useContext, useEffect } from 'react'
import AuthContext from '../Context/AuthContext'
import {Navigate,Outlet,useNavigate}  from 'react-router-dom'

function CaseOfAdmin() {
    let {adminToken}=useContext(AuthContext) 
   
    return adminToken ? <Outlet /> : <Navigate to="/login"/> 
    }
    
export default CaseOfAdmin