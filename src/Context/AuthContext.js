import { createContext,useState } from "react"
import axios  from '../axios'
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';



const AuthContext = createContext()
export default AuthContext;

export const AuthProvider=({children})=>{
    let [authToken, setauthToken] = useState(()=>localStorage.getItem('authToken')? JSON.parse(localStorage.getItem('authToken')):null);
    let [user,setUser]=useState(()=>localStorage.getItem('authToken')? jwt_decode(localStorage.getItem('authToken')):null)

    let [admin,setAdmin]=useState(()=>localStorage.getItem('adminToken')? jwt_decode(localStorage.getItem('admin')):null)
    let [adminToken,setadminToken]=useState(()=>localStorage.getItem('adminToken')? JSON.parse(localStorage.getItem('admin')):null)

    const navigate=useNavigate()

    const Userlogin = async(email,password)=>{

        await axios.post('user/login/' , {email:email,password:password}).then((res)=>{
            console.log(res.data);
        })
    }

    let contextData={
        Userlogin:Userlogin,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}