import './components.css';
import logo from '../images/BullForceLogo.png';
import slogon from '../images/BullForceLogoName.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef,useContext} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import UserContext from '../contexts/userContext'
const otpValidationSchema = yup.object().shape({
  digit1: yup.string().length(1, 'OTP digit must be a single character').required('Digit 1 is required'),
  digit2: yup.string().length(1, 'OTP digit must be a single character').required('Digit 2 is required'),
  digit3: yup.string().length(1, 'OTP digit must be a single character').required('Digit 3 is required'),
  digit4: yup.string().length(1, 'OTP digit must be a single character').required('Digit 4 is required'),
});

export default function ValidateOTP() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const {user,userDispatch}=useContext(UserContext)
  console.log(user)
  const data=user?.data
  console.log(data)
  const email = data?.[0]?.email;
  console.log(email)
  const [otp, setOtp] = useState('');
  const [digit1, setDigit1] = useState('0');
  const [digit2, setDigit2] = useState('0');
  const [digit3, setDigit3] = useState('0');
  const [digit4, setDigit4] = useState('0');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setOtp(`${digit1}${digit2}${digit3}${digit4}`);
  }, [digit1, digit2, digit3, digit4]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await otpValidationSchema.validate({ digit1, digit2, digit3, digit4 }, { abortEarly: false })
      const response = await axios.post(`http://localhost:3050/api/otpValidate`, { otp });
      console.log(response.data);

      Swal.fire({
        title: 'Success!',
        text: 'OTP validated successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setDigit1('0');
      setDigit2('0');
      setDigit3('0');
      setDigit4('0');
      navigate('/dashboard', { state: { email: response.data.email } });
      const currentDate = new Date().toLocaleString();
      localStorage.setItem('loginTime', currentDate);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setFormErrors(errors);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.error || 'Something went wrong!',
        });

        if (err.response?.data?.error === 'OTP has expired') {
          navigate('/');
        }
      }
    }
  };

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
        <p id="mail-id">{email|| 'Loading email...'}</p>
        <form onSubmit={handleSubmit}>
          <input
            className="otp-input"
            type="text"
            value={digit1}
            onChange={(e) => handleInputChange(e, 0, setDigit1, 1)}
            ref={(el) => (inputRefs.current[0] = el)}
          />
          
          
          <input
            className="otp-input"
            type="text"
            value={digit2}
            onChange={(e) => handleInputChange(e, 1, setDigit2, 2)}
            ref={(el) => (inputRefs.current[1] = el)}
          />
          

          <input
            className="otp-input"
            type="text"
            value={digit3}
            onChange={(e) => handleInputChange(e, 2, setDigit3, 3)}
            ref={(el) => (inputRefs.current[2] = el)}
          />
          

          <input
            className="otp-input"
            type="text"
            value={digit4}
            onChange={(e) => handleInputChange(e, 3, setDigit4, 4)}
            ref={(el) => (inputRefs.current[3] = el)}
          />
          {formErrors.digit1 && <div className="text-danger">{formErrors.digit1}</div>}
          {formErrors.digit2 && <div className="text-danger">{formErrors.digit2}</div>}
          {formErrors.digit3 && <div className="text-danger">{formErrors.digit3}</div>}
          {formErrors.digit4 && <div className="text-danger">{formErrors.digit4}</div>}

          <button id="validate-button">Proceed</button>
        </form>
      </div>
    </div>
  );
}
