import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';



const Home = () => {
  const location = useLocation();
  const [success, setSuccess] = useState<string | null>(location.state?.message);
  

  useEffect(() => {
    setSuccess(location.state.message);
    const timer = setTimeout(() =>  {
      setSuccess(null);
    }, 3000)
    return () => clearTimeout(timer);
  }, [location.state])
  
  return (
    <>
      {success ? (<p className="bg-success text-white p-3">{success}</p>) : null}
    </>
  )
}

export default Home
