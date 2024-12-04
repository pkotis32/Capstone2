import {useNavigate} from 'react-router-dom'
import './FinishProfile.css'

// finish profile message component
const FinishProfile = () => {


  const navigate = useNavigate();

  // when user finishes their profile, navigate back to home
  const handleFinish = () => {
    navigate('/setup_profile/step1')
  }


  return (
    <div className="finish-profile-container">
      <h2>It looks like you haven't finished setting up your profile</h2>
      <h4>You will need to finish setting up your profile to search for players</h4>
      <button onClick={() => handleFinish()} className="btn mb-2">Complete Profile</button>
    </div>
  )
}

export default FinishProfile
