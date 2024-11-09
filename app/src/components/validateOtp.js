import './components.css'
import logo from '../images/BullForceLogo.png'
import slogon from '../images/BullForceLogoName.png'
import {useLocation,useNavigate} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function ValidateOTP(){
    const location = useLocation();
    const email = location.state?.email;
    const navigate=useNavigate()
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState('');
    const [digit1, setDigit1] = useState('0');
    const [digit2, setDigit2] = useState('0');
    const [digit3, setDigit3] = useState('0');
    const [digit4, setDigit4] = useState('0');

    useEffect(() => {
        setOtp(`${digit1}${digit2}${digit3}${digit4}`);
    }, [digit1, digit2, digit3, digit4]);
    console.log(otp)
    const handleSubmit = async (e) => {
        e.preventDefault();
       try{
        const response=await axios.post(`http://localhost:3050/api/otpValidate`,{otp})
        console.log(response.data)
        Swal.fire({
            title: 'Success!',
            text: `OTP validated succesfully`,
            icon: 'success',
            confirmButtonText: 'OK'
        })
        setDigit1('0')
        setDigit2('0')
        setDigit3('0')
        setDigit4('0')
        navigate('/dashboard',{ state: { email: response.data.email } })
        const currentDate = new Date().toLocaleString();
        localStorage.setItem('loginTime', currentDate);
       }catch(err){
        console.log(err.response.data.error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.error,
          })
          if(err.response.data.error=='OTP has expired'){
            navigate('/')
          }
          
       }
    }

    const handleInputChange = (e, index, setDigit, nextInputIndex) => {
        const value = e.target.value.slice(-1);
        setDigit(value);

        if (value.length === 1 && nextInputIndex < inputRefs.current.length) {
            inputRefs.current[nextInputIndex].focus();
        }
    };

    return (
        <div id="body">
            <div id="card">
                <img src={logo} alt="logo" id="login-logo" /><br />
                <img src={slogon} alt="slogon" id="login-slogon" />
                <p id="heading">OTP</p>
                <p id="heading2">Please enter the OTP sent to</p>
                <p id="mail-id">{email}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        className='otp-input'
                        type="text"
                        value={digit1}
                        onChange={(e) => handleInputChange(e, 0, setDigit1, 1)}
                        ref={(el) => (inputRefs.current[0] = el)}
                    />
                    <input
                        className='otp-input'
                        type="text"
                        value={digit2}
                        onChange={(e) => handleInputChange(e, 1, setDigit2, 2)}
                        ref={(el) => (inputRefs.current[1] = el)}
                    />
                    <input
                        className='otp-input'
                        type="text"
                        value={digit3}
                        onChange={(e) => handleInputChange(e, 2, setDigit3, 3)}
                        ref={(el) => (inputRefs.current[2] = el)}
                    />
                    <input
                        className='otp-input'
                        type="text"
                        value={digit4}
                        onChange={(e) => handleInputChange(e, 3, setDigit4, 4)}
                        ref={(el) => (inputRefs.current[3] = el)}
                    />
                    <button id="validate-button">Proceed</button>
                </form>
            </div>
        </div>
    );
}
