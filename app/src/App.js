import {Routes,Route} from 'react-router-dom'
import './App.css';
import Header from './Header/header'
import LoginPage from '../src/components/loginPage'
import ValidateOTP from '../src/components/validateOtp'
import Dashboard from '../src/components/dashboard'
import { useReducer } from 'react';
import userReducer from './Reducers/userReducer';
import UserContext from './contexts/userContext';
function App() {
  const userInitialState={
    data:[],
    serverErrors:[]
  }
  const [user,userDispatch]=useReducer(userReducer,userInitialState)
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
       <div className="App">
     <Header/>
     <Routes>
     <Route path="/" element={<LoginPage />} /> 
      <Route path='/otpVerify' element={<ValidateOTP/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
     </Routes>
    </div>
    </UserContext.Provider>
   
  );
}

export default App;
