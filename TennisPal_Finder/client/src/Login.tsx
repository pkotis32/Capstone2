import {useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

interface loginProps {
  login: (username: string, lastName: string) => Promise<string | null>;
}


// login form
const Login = ({login}: loginProps) => {

  const navigate = useNavigate();

  // saves error message for login form
  const [error, setError] = useState("");

  // initializes form data in state
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  
  // updates the form data when it is changed
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  // submits the form data and attempts to login the user
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if user successfully logs in, display success message
    try {
      await login(formData.username, formData.password)
      navigate('/', {state: {success: `Welcome back ${formData.username}!`}}); 
    }
    // if not, display error message
    catch (error: any) {
      setError(error[0])
    }
  }
  
  
  return (
    <>
      <div className="login" style={{backgroundColor: "#f0f0f0", height: "100vh"}}>
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
            {error ? (<span className="text-danger" style={{display: "block"}}>{error}</span>) : null}
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
