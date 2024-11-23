import React, {useState} from 'react'
import './Step1.css'
import {useNavigate} from 'react-router-dom'

const Step1 = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    streetName: '',
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
    const fullAddress =  `${formData.streetName}, ${formData.city}, ${formData.state} ${formData.zipCode}`
    navigate('/finish/step2')
  }
  
  
  return (
    <div className="container mt-5">
      <div className="step">
        <h5 className='text-primary p-3'>Step 1/3</h5>
      </div>
      <h1>Enter Address Information</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form_elements">
          <label>
            <div>Street Name:</div>
            <input required className="mb-2" name="streetName" value={formData.streetName} onChange={(e) => handleChange(e)} type="text" />
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
            <div>Zip Code</div> 
            <input required className="mb-2" name="zipCode" value={formData.zipCode} onChange={(e) => handleChange(e)} type="text" />
          </label>
          <button className="btn btn-primary">Submit</button>
        </div> 
      </form>
    </div>
  )
}

export default Step1
