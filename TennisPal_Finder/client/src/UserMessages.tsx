import {useState, useEffect, useContext} from 'react'
import TennisApi from '../api'
import UserContext from './UserContext';
import TokenContext from './TokenContext';
import {ListGroup, ListGroupItem} from 'reactstrap'
import UserMessagesCard from './UserMessagesCard';


// displays all the users the a user has messages with
const UserMessages = () => {

  const sender = useContext(UserContext);
  const token = useContext(TokenContext);
  const [currentChats, setCurrentChats] = useState<string[]>([])
  
  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await TennisApi.getUser(sender, token);
        let senderId = response.userInfo.userId;
        const {users}: { users: { username: string }[] } = await TennisApi.getUserChats(senderId, sender, token);
        const chats = users.map(user => user.username);
        setCurrentChats(chats)   
      } catch (error) {
        console.error(error);
      }
    }
    getChats();
  }, [])


  return (
    <div style={{backgroundColor: "#f0f0f0", height: "100vh"}} className="user-message-container">
      <h1>Messages</h1>
      <ListGroup>
        {currentChats ? (
          currentChats.map((user) => (
            <ListGroupItem style={{backgroundColor: "#f0f0f0", border: "none"}}>
              <UserMessagesCard user={user}></UserMessagesCard>
            </ListGroupItem>
          ))
        ) : (<div>No Chats</div>)}
      </ListGroup>
    </div>
  )
}

export default UserMessages
