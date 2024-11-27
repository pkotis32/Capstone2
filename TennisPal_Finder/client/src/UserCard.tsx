import {Card, CardBody, CardTitle, CardText} from 'reactstrap'
import './UserCard.css'
import {useNavigate} from 'react-router-dom'

interface UserInfo {
  userId: number,
  username: string,
  firstName: string,
  lastName: string,
  skillLevel: string,
  distance: number,
  availabilities: string[]
}


interface userCardProps {
  user: UserInfo
}


const UserCard = ({user}: userCardProps) => {
  
  const navigate = useNavigate();
  
  const handleClick = (username: string) => {
    navigate(`/message/${username}`)
  }


  return (
    <div>
      <Card className="user-card">
        <div className="user-card-header">
          <img 
            src=""
            alt={`${user.firstName} ${user.lastName}`} 
            className="profile-picture" 
          />
          <div>
            <CardTitle className="user-name">
              {user.firstName} {user.lastName[0]}
            </CardTitle>
            <CardText className="user-skill">{user.skillLevel}</CardText>
          </div>
          <button onClick={() => handleClick(user.username)} className="btn btn-info message" >Message</button>
        </div>
        <CardBody>
          <div className="availabilities">
            <CardText>
              <strong>Available on:</strong>
            </CardText>
            <CardText>
              <ul className="availability-list">
                {user.availabilities.map((day, index) => (
                  <li className="ms-2" key={index}>{day}</li>
                ))}
              </ul>
            </CardText>
          </div>
          <CardText className="distance">
            <strong>Distance:</strong> {user.distance} miles
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default UserCard
