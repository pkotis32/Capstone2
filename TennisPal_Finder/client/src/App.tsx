import { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {jwtDecode} from "jwt-decode";
import TennisApi from '../api'
import NavigationBar from './Navbar'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import UserContext from './UserContext'



export interface signupArgs {
  username: string,
  password: string,
  email: string, 
  firstName: string,
  lastName: string, 
  skillLevel: string
}

function App() {

  

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currUser, setCurrUser] = useState("")
  


  const signup = async ({username, password, firstName, lastName, email, skillLevel}: signupArgs) => {
      const res = await TennisApi.signup(username, password, email, firstName, lastName, skillLevel);
      const tok = res.token;
      setToken(tok);
      localStorage.setItem('token', tok);
      return token;
  }

  const login = async (username: string, password: string) => {
    const res = await TennisApi.login(username, password);
    const tok = res.token;
    setToken(tok);
    localStorage.setItem('token', tok);
    return token;
  }

  const logout = () => {
    localStorage.removeItem('token');
    setCurrUser("");
  }

  interface myJwtPayload {
    username: string;
  }

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) as myJwtPayload;
      setCurrUser(decoded.username);
    }
    else {
      setCurrUser("");
    }
  }, [token])

  

  return (
    <>
      <UserContext.Provider value={currUser}>
        <BrowserRouter>
          <NavigationBar user={currUser} logout={logout}></NavigationBar>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login login={login} />}></Route>
            <Route path="/signup" element={<Signup signup={signup} />}></Route>
            <Route path="/setup_profile/step1" element={<Step1 />}></Route>
            <Route path="/setup_profile/step2" element={<Step2 />}></Route>
            <Route path="/setup_profile/step3" element={<Step3 />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App;
