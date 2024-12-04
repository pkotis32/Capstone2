import React, {useState, useContext} from 'react'
import './Step1.css'
import {useNavigate} from 'react-router-dom'
import UserContext from './UserContext.jsx'
import TokenContext from './TokenContext.js'
import TennisApi from '../api.js'


// form component to save the users home address
const Step1 = () => {
  
  const username = useContext(UserContext)
  const token = useContext(TokenContext)
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // initializes form data
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // updates form values when they are changed
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // attempts to save the users home address in the database
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const fullAddress = `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`
      await TennisApi.saveAddress(username, fullAddress, token)
      navigate('/setup_profile/step2')
    } catch (error: any) {
      console.log(error)
      setError(error[0]);
    }
  }
  
  
  return (
    <div className="step1 pt-5" style={{backgroundColor: "#f0f0f0", height: "100vh"}}>
      <div className="container">
        <div className="step">
          <h5 className='text-primary p-3'>Step 1/3</h5>
        </div>
        <h2>Enter Your Home Address</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form_elements">
            <label>
              <div>Street Address:</div>
              <input required className="mb-2" name="streetAddress" value={formData.streetAddress} onChange={(e) => handleChange(e)} type="text" />
            </label>
            <label>
              <div>City:</div>
              <input required className="mb-2" name="city" value={formData.city} onChange={(e) => handleChange(e)} type="text" />
            </label>
            <label>
              <div>State:</div>
              <input required className="mb-2" name="state" value={formData.state} onChange={(e) => handleChange(e)}type="text" />
            </label>
            <label>
              <div>Zip Code:</div> 
              <input required className="mb-2" name="zipCode" value={formData.zipCode} onChange={(e) => handleChange(e)} type="text" />
            </label>
            <button className="btn btn-primary">Submit</button>
            {error ? (<div className="text-danger">{error}</div>) : null}
          </div> 
        </form>
      </div>
    </div>
  )
}

export default Step1
