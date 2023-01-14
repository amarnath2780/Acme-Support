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

    const [message, setmessage] = useState('');

    const Userlogin = async(email,password)=>{

        await axios.post('user/login/' , {email:email,password:password}).then((res)=>{
            console.log(res.data);
            if (res.data.token){
                if (res.data.user.role == 'user'){
                    localStorage.setItem('authToken',JSON.stringify(res.data))
                    localStorage.setItem('token',JSON.stringify(res.data.token))
                    setauthToken(res.data)
                    setUser(res.data.token)
                    localStorage.setItem('userId',JSON.stringify(res.data.user.user_id))
                    navigate('/')
                }
                else if(res.data.user.role == 'admin'){
                    localStorage.setItem('adminToken',JSON.stringify(res.data))
                    localStorage.setItem('token',JSON.stringify(res.data.token))
                    setAdmin(res.data)
                    setadminToken(res.data.token)                      
                    localStorage.setItem('userId',JSON.stringify(res.data.user.user_id))
                    navigate('/admin')
                  }
            }
        }).catch((error)=>{
            if (error.response) {
                setmessage('User Name not found')
            }
            else if(error.request){
                setmessage('User Name not found')
            }
            else{
                setmessage('User Name not found')
            }
            setmessage('User Name not found')
        })
    }

    let logOut=()=>{
        axios.post('user/logout/').then((res)=>{
            console.log(res.data)
        })
        localStorage.removeItem('authToken')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('adminToken')
        localStorage.removeItem('Role')

        setUser(null)
        setauthToken(null)
        setAdmin(null)
        setadminToken(null)
        navigate('/login')
    }

    let contextData={
        Userlogin:Userlogin,
        logOut:logOut,
        message:message,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}