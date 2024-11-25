import React, {useState, useContext} from 'react'
import './Step3.css'
import TennisApi from '../api.js'
import UserContext from './UserContext.jsx'
import {useNavigate} from 'react-router-dom'

const Step3 = () => {

  const username = useContext(UserContext);
  const navigate = useNavigate();
  
  const [availabilities, setAvailabilities] = useState({
    Monday: false, 
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAvailabilities((prevState) => ({
      ...prevState,
      [name]: checked, // Update state based on the checkbox's name and checked value
    }));
  };

  
  let days = Object.entries(availabilities)
      .filter(([day, value]) => value)
      .map(([day]) => day);

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      await TennisApi.saveAvailabilities(username, days)
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="step3">
      <div className="container mt-5">
        <div className="step">
          <h5 className='text-primary p-3'>Step 3/3</h5>
        </div>
        <h3>Select Your Availabilities</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-elements">
            {Object.keys(availabilities).map((day) => (
              <label>
                <div>{day}</div>
                <input
                  className="ms-1"
                  type="checkbox"
                  name={day}
                  checked={availabilities[day as keyof typeof availabilities]} // Tie checked to the state
                  onChange={handleCheckboxChange} // Update state on change
                />
              </label>
            ))}
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>

    </div>
  );
};



export default Step3
