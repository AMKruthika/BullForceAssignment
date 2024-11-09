import {Routes,Route} from 'react-router-dom'
import './App.css';
import Header from './Header/header'
import LoginPage from '../src/components/loginPage'
import ValidateOTP from '../src/components/validateOtp'
import Dashboard from '../src/components/dashboard'
function App() {
  return (
    <div className="App">
     <Header/>
     <Routes>
     <Route path="/" element={<LoginPage />} /> 
      <Route path='/otpVerify' element={<ValidateOTP/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
     </Routes>
    </div>
  );
}

export default App;
