import {Card, CardTitle} from 'reactstrap'
import {useNavigate} from 'react-router-dom'
import './UserMessagesCard.css'

interface UserMessageCardProps {
  user: string;
}


// card that contains the user information to display when showing people a user has messages with
const UserMessagesCard = ({user}: UserMessageCardProps) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/send_message/${user}`)
  };

  return (
    <div>
      <Card onClick={handleClick} className="chat">
        <div className="user-card-header">
          <img 
            src=""
            className="profile-picture" 
          />
          <div>
            <CardTitle className="user-name">
              {user}
            </CardTitle>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserMessagesCard
