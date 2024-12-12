import {useState} from 'react'
import './Signup.css'
import {signupArgs} from './App'
import { useNavigate } from 'react-router-dom';

interface signupProps {
  signup: (args: signupArgs) => Promise<string | null | undefined>; 
}

// signup form
const Signup = ({signup}: signupProps) => {

  const navigate = useNavigate();

  // saves error message for signup form
  const [error, setError] = useState("");

  // initializes form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    skillLevel: 'beginner'
  })
  
  // updates form data when it is changed
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  // attempts to sign in user
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate('/', {state: {message: "You successfully signed up!"}});
    }
    catch (error: any) {
      console.log(error)
      if (error[0] == "instance.password does not meet minimum length of 6") {
        setError("password must be at least 6 characters")
      }
      else if (error[0].includes(`duplicate key value violates unique constraint "users_email_key"`)){
        setError("email already in use")
      }
      else {
        setError(error[0]);
      }
      
    }
  }
  
  
  return (
   <>
    <div className='signup' style={{backgroundColor: "#f0f0f0", height: "100vh"}}>
      <h1>Signup</h1>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <div className="form_elements">
          <label>
            <div> Username: </div>
            <input className="mb-2" name="username" value={formData.username} onChange={(e) => handleChange(e)} type="text" required/>
          </label>
          <label>
            <div>Password:</div>
            <input className="mb-2" name="password" value={formData.password} onChange={(e) => handleChange(e)} type="password" required/>
          </label>
          <label>
            <div>Email:</div>
            <input className="mb-2" name="email" value={formData.email} onChange={(e) => handleChange(e)} type="text" required/>
          </label>
          <label>
            <div>First Name:</div> 
            <input className="mb-2" name="firstName" value={formData.firstName} onChange={(e) => handleChange(e)} type="text" required/>
          </label>
          <label>
            <div>Last Name:</div> 
            <input className="mb-2" name="lastName" value={formData.lastName} onChange={(e) => handleChange(e)} type="text" required/>
          </label>
          <label>
            <div>
              <div>SkillLevel:</div>
            </div>
            <div>
              <select 
                  className="mb-2" 
                  name="skillLevel" 
                  value={formData.skillLevel} 
                  onChange={(e) => handleChange(e)}
                >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </label>
          <button className="btn btn-primary w-50">Signup</button>
          {error ? (<span className="text-danger" style={{display: "block"}}>{error}</span>) : null}
        </div> 
      </form>
    </div>
   </>
  )
}

export default Signup
