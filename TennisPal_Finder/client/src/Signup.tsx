import React, {useState} from 'react'
import './Signup.css'
import {signupArgs} from './App'
import { useNavigate } from 'react-router-dom';

interface signupProps {
  signup: (args: signupArgs) => Promise<string | null | undefined>; 
}


const Signup = ({signup}: signupProps) => {

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    skillLevel: ''
  })
  
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signup(formData)
      navigate('/', {state: {message: "You successfully signed up!"}});
    }
    catch (error: any) {
      setError(error[0]);
    }
  }
  
  
  return (
   <>
    <h1>Signup</h1>
    <form onSubmit={(e) => {handleSubmit(e)}}>
      <div className="form_elements">
        <label>
          Username: 
          <input className="ms-3 mb-2" name="username" value={formData.username} onChange={(e) => handleChange(e)} type="text" />
        </label>
        <label>
          Password: 
          <input className="ms-3 mb-2" name="password" value={formData.password} onChange={(e) => handleChange(e)} type="password" />
        </label>
        <label>
          Email: 
          <input className="ms-3 mb-2" name="email" value={formData.email} onChange={(e) => handleChange(e)} type="text" />
        </label>
        <label>
          First Name: 
          <input className="ms-3 mb-2" name="firstName" value={formData.firstName} onChange={(e) => handleChange(e)} type="text" />
        </label>
        <label>
          Last Name: 
          <input className="ms-3 mb-2" name="lastName" value={formData.lastName} onChange={(e) => handleChange(e)} type="text" />
        </label>
        <label>
          Skill Level: 
          <input className="ms-3 mb-2" name="skillLevel" value={formData.skillLevel} onChange={(e) => handleChange(e)} type="text" />
        </label>
      </div>
      <button className="btn btn-primary">Signup</button>
      {error ? (<div className="text-danger">{error}</div>) : null}
    </form>
   </>
  )
}

export default Signup
