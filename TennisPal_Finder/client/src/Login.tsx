import React, {useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

interface loginProps {
  login: (username: string, lastName: string) => Promise<string | null>;
}


const Login = ({login}: loginProps) => {

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
      await login(formData.username, formData.password)
      navigate('/', {state: {message: `Welcome back ${formData.username}!`}}); 
    }
    catch (error: any) {
      setError(error[0])
    }
  }
  
  
  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form_elements">
            <label>
              <div>Username:</div>
              <input className="mb-2" name = "username" value = {formData.username} onChange = {(e) => handleChange(e)}  />
            </label>
            <label>
              <div>Password:</div>
              <input className="mb-2" name = "password" value = {formData.password} onChange = {(e) => handleChange(e)} type="password" />
            </label>
            <button className = "btn w-50 btn-primary">Login</button>
            {error ? (<div className="text-danger">{error}</div>) : null}
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
