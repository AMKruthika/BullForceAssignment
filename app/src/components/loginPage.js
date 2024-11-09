import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './components.css'
import logo from '../images/BullForceLogo.png'
import slogon from '../images/BullForceLogoName.png'
import Swal from 'sweetalert2'
export default function LoginPage(){
    const navigate=useNavigate();
    const [email,setEmail]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post(`http://localhost:3050/api/otpGenerate`,{email})
            console.log(response.data.email)
            setEmail('')
            navigate('/otpVerify',{ state: { email: response.data.email } })
            localStorage.setItem('email', email);
        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data.error,
              })
              if(err.response.data.error=='An OTP is already active for this email.'){
                navigate('/otpVerify')
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
                id='login-input'/><br/>
                <button id="login-button">Login</button>
                </form>
                
            </div>
            
        </div>
        
    )
}