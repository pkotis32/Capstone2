import React from 'react'
import {useNavigate} from 'react-router-dom'






const FinishProfile = () => {


  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/setup_profile/step1')
  }

  const handleDontFinish =() => {
    navigate('/')
  }

  return (
    <div>
      <h1>It looks like you haven't finished setting up your profile</h1>
      <h2>You will need to finish setting up your profile to search for players</h2>
      
      
      <button onClick={() => handleFinish()} className="btn btn-info">Complete Profile</button>
      <button onClick={() => handleDontFinish()} className="btn btn-danger">Cancel</button>
    </div>
  )
}

export default FinishProfile
