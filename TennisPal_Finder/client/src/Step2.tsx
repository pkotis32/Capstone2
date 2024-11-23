import React, {useState, useContext} from 'react'
import './Step2.css'
import {useNavigate} from 'react-router-dom'
import UserContext from './UserContext.jsx'
import TennisApi from '../api.js'




const Step2 = () => {
  
  const username = useContext(UserContext)
  const navigate = useNavigate();
  const [error, setError] = useState("");



  const [formData, setFormData] = useState({
    courtName: '',
    courtAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e: any) => {
    e.preventDefault();

  }
  
  return (
    <div className="container w-50 mt-5">
      <div className="step">
        <h5 className='text-primary p-3'>Step 2/3</h5>
      </div>
      <h2>Enter Preferred Court Address</h2>
      <form >
        <div className="form_elements">
          <label>
            <div>Court Name:</div>
            <input required className="mb-2" name="courtName" value={formData.courtName} onChange={(e) => handleChange(e)} type="text" />
          </label>
          <label>
            <div>Court Address:</div>
            <input required className="mb-2" name="courtAddress" value={formData.courtAddress} onChange={(e) => handleChange(e)} type="text" />
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
  )
}

export default Step2;
