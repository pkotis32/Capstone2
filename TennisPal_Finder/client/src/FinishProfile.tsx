
import {useNavigate} from 'react-router-dom'


// finish profile message component
const FinishProfile = () => {


  const navigate = useNavigate();

  // when user finishes their profile, navigate back to home
  const handleFinish = () => {
    navigate('/setup_profile/step1')
  }


  return (
    <div>
      <h1>It looks like you haven't finished setting up your profile</h1>
      <h2>You will need to finish setting up your profile to search for players</h2>
      
      <button onClick={() => handleFinish()} className="btn btn-info">Complete Profile</button>
    </div>
  )
}

export default FinishProfile
