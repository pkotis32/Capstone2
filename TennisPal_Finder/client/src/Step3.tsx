import React, {useState, useContext} from 'react'
import './Step3.css'
import TennisApi from '../api.js'
import UserContext from './UserContext.jsx'
import {useNavigate} from 'react-router-dom'
import TokenContext from './TokenContext.js'


interface FinishProfileProps {
  handleFinishProfile: () => void;
}

// form to save the user's available days to play
const Step3 = ({handleFinishProfile}: FinishProfileProps) => {

  const username = useContext(UserContext);
  const token = useContext(TokenContext);
  const navigate = useNavigate();
  
  // initializes available days 
  const [availabilities, setAvailabilities] = useState({
    Monday: false, 
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false
  });

  // updates the checkbox when it is clicked on
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAvailabilities((prevState) => ({
      ...prevState,
      [name]: checked, // Update state based on the checkbox's name and checked value
    }));
  };

  // filters the form data to create an array the only contains the available days of the user
  let days = Object.entries(availabilities)
      .filter(([day, value]) => value)
      .map(([day]) => day);


  // saves the user's availabilities in the database
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      await TennisApi.saveAvailabilities(username, days, token)
      handleFinishProfile();
      navigate('/', {state: {success: "Finished creating your profile"}});
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="step3 pt-5" style={{backgroundColor: "#f0f0f0", height: "100vh"}}>
      <div className="container">
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
