import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import FinishProfile from './FinishProfile';




const Home = () => {
  const location = useLocation();
  const [success, setSuccess] = useState<string | null>(location.state?.message);
  const [finishedProfile, setFinishedProfile] = useState(false);
  

  const handleFinishProfile = () => {
    setFinishedProfile(true);
  }

  useEffect(() => {
    setSuccess(location.state?.message);
    const timer = setTimeout(() =>  {
      setSuccess(null);
    }, 3000)
    return () => clearTimeout(timer);
  }, [location.state])
  
  return (
    <>
      {success ? (<p className="bg-success text-white p-3">{success}</p>) : null}
      <FinishProfile />
    </>
  )
}

export default Home
