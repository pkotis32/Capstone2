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
import TokenContext from './TokenContext'
import ProtectedRoute from './ProtectedRoute'
import Users from './Users'



export interface signupArgs {
  username: string,
  password: string,
  email: string, 
  firstName: string,
  lastName: string, 
  skillLevel: string
}

function App() {


  // uses state to save the token, retrieves the value from local storage
  const [token, setToken] = useState(() => {
    let token = localStorage.getItem('token');
    return token ? token : "";
  })

  // saves the currUser in state
  const [currUser, setCurrUser] = useState("")

  // saves if the current user has finished their profile
  const [finishedProfile, setFinishedProfile] = useState<boolean>(false);

  // when user finishes profile, it is saved in local storage and state
  const handleFinishProfile = () => {
    setFinishedProfile(true);
    localStorage.setItem(`${currUser}_finishedProfile`, "true");
  }
  
  // sign up function, sets token in state and local storage
  const signup = async ({username, password, firstName, lastName, email, skillLevel}: signupArgs) => {
      const res = await TennisApi.signup(username, password, email, firstName, lastName, skillLevel);
      const tok = res.token;
      setToken(tok);
      localStorage.setItem('token', tok);
      localStorage.setItem(`${username}_finishedProfile`, "false");
      return token;
  }

  // login function, saves token in state and local storage
  const login = async (username: string, password: string) => {
    const res = await TennisApi.login(username, password);
    const tok = res.token;
    setToken(tok);
    localStorage.setItem('token', tok);
    return token;
  }

  // logout function, removes the token from local storage and state
  const logout = () => {
    localStorage.removeItem('token');
    setFinishedProfile(false);
    setCurrUser("");
  }

  interface myJwtPayload {
    username: string;
  }

  // every time the user changes, update the current user and whether they have finished their profile
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) as myJwtPayload;
      setCurrUser(decoded.username);
      const finishedProfile = localStorage.getItem(`${decoded.username}_finishedProfile`);
      setFinishedProfile(finishedProfile === "true");
    }
    else {
      setCurrUser("");
      setFinishedProfile(false)
    }
  }, [token])



  

  return (
    <>
      <TokenContext.Provider value={token}>
      <UserContext.Provider value={currUser}>
        <BrowserRouter>
          <NavigationBar user={currUser} logout={logout}></NavigationBar>
          <Routes>
            <Route path="/" element={<Home finishedProfile={finishedProfile}/>}></Route>
            <Route path="/login" element={<Login login={login} />}></Route>
            <Route path="/signup" element={<Signup signup={signup}/>}></Route>
            <Route path="/setup_profile/step1" element={
              <ProtectedRoute currUser={currUser}>
                <Step1 />
              </ProtectedRoute> }>
            </Route>
            <Route path="/setup_profile/step2" element={
              <ProtectedRoute currUser={currUser}>
                <Step2 />
              </ProtectedRoute> }>  
            </Route>
            <Route path="/setup_profile/step3" element={
              <ProtectedRoute currUser={currUser}>
                <Step3 handleFinishProfile={handleFinishProfile}/>
              </ProtectedRoute> }> 
            </Route>
            <Route path="/users" element={
              <ProtectedRoute currUser={currUser}>
                <Users/>
              </ProtectedRoute> }> 
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      </TokenContext.Provider>
    </>
  )
}

export default App;
