import {useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './components.css'
import logo from '../images/BullForceLogo.png'
import slogon from '../images/BullForceLogoName.png'
import Swal from 'sweetalert2'
import * as yup from 'yup';
import UserContext from '../contexts/userContext'
const userLoginValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required')
})
export default function LoginPage(){
    const navigate=useNavigate();
    const [email,setEmail]=useState('')
    const [formErrors, setFormErrors] = useState({});
    const {user,userDispatch}=useContext(UserContext)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            await userLoginValidationSchema.validate({email}, { abortEarly: false });
            const response=await axios.post(`http://localhost:3050/api/otpGenerate`,{email})
            console.log('response',response.data)
            userDispatch({type:'ADD_USER',payload:response.data})
           
            console.log(user?.data?.email)
            setEmail('')
            navigate('/otpVerify')
            localStorage.setItem('email', email);
        }catch(err){
            if (err.name === 'ValidationError') {
                const errors = {};
                err.inner.forEach((e) => {
                  errors[e.path] = e.message;
                });
                setFormErrors(errors);
              }else{
                userDispatch({type: 'SET_SERVER_ERRORS',
                    payload: err.response?.data?.errors})
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err?.response?.data?.error || 'something went wrong !',
                  })
                  if(err?.response?.data?.error=='An OTP is already active for this email.'){
                    navigate('/otpVerify')
                  }
              }
            
        }
    }
    return(
        <div id="body">
            <div id="card">
                <img src={logo} alt="logo" id="login-logo"/><br/>
                <img src={slogon} alt="slogon" id="login-slogon"/>
                <p id="login-text">Login</p><br/>
                <p id="login-text2">Login with Email ID</p>
                <form onSubmit={handleSubmit}>
                <input type='text'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                id='login-input'/>
                {formErrors.email && <div style={{color:'royalblue'}}>{formErrors.email}</div>}
                <br/>
                <button id="login-button">Login</button>
                </form>
                
            </div>
            
        </div>
        
    )
}