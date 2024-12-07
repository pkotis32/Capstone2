import React, {useEffect, useState, useContext} from 'react'
import { useLocation } from 'react-router-dom';
import FinishProfile from './FinishProfile';
import UserContext from './UserContext';
import './Home.css'

interface HomeProps {
  finishedProfile: boolean;
}

// home page
const Home = ({finishedProfile}: HomeProps) => {
  
  // saves success and error messages in state 
  const location = useLocation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const username = useContext(UserContext);

  // if the state changes on the location object, then display those messages 
  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      setError(""); // Clear any error message
      const timer = setTimeout(() => {
        setSuccess(""); // Clear success message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clean up on component unmount or state change
    } else if (location.state?.error) {
      setError(location.state.error);
      setSuccess(""); // Clear any success message
      const timer = setTimeout(() => {
        setError(""); // Clear error message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clean up on component unmount or state change
    }
  }, [location.state]);
  

  return (
    <>
      {success ? (<p className="bg-success text-white p-3 m-0">{success}</p>) : null}
      {error ? (<p className="bg-danger text-white p-3 m-0">{error}</p>) : null}
      {!finishedProfile && username? <FinishProfile/> : null}
      <div className='background'>
        <img src="https://img.freepik.com/free-photo/young-couple-playing-tennis-court_1303-16307.jpg" alt="" />
      </div>
    </>
  )
}

export default Home
