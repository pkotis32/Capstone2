import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import FinishProfile from './FinishProfile';

interface HomeProps {
  finishedProfile: boolean;
}

// home page
const Home = ({finishedProfile}: HomeProps) => {
  
  // saves success and error messages in state 
  const location = useLocation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
      {success ? (<p className="bg-success text-white p-3">{success}</p>) : null}
      {error ? (<p className="bg-danger text-white p-3">{error}</p>) : null}
      {!finishedProfile? <FinishProfile/> : null}
    </>
  )
}

export default Home
