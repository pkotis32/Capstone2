import {useState, useEffect, useContext} from 'react'
import {ListGroup, ListGroupItem} from 'reactstrap'
import TennisApi from '../api'
import UserCard from './UserCard'
import TokenContext from './TokenContext'
import UserContext from './UserContext'


interface UserInfo {
  userId: number,
  username: string,
  firstName: string,
  lastName: string,
  skillLevel: string,
  distance: number,
  availabilities: string[]
}



const Users = () => {
  
  // save all the users in state
  const [users, setUsers] = useState<UserInfo[]>([]);
  // retrieve the username and token values from context
  const username = useContext(UserContext);
  const token = useContext(TokenContext);
  const [loading, setLoading] = useState<boolean>()
  

  // when componet renders, retrieve all users and store them in state
  useEffect(() => {
    const fetchUsers = async () => {
      try { 
        const currUsers = await TennisApi.getUsers(username, token);
        // filter out some of the user information retrieved
        setUsers(currUsers.users);
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers();
  }, [])

  useEffect(() => {
    setLoading(true);
    // Simulate a loading time of 0.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);  // Hide loading screen after 0.5 seconds
    }, 500);

    return () => clearTimeout(timer);  // Cleanup the timer on unmount
  }, [users]);


  if (loading) {
    return <div>Loading users...</div>; // Show loading screen
  }




  
  return (
    <div style={{backgroundColor: "#f0f0f0", height: "100vh"}}>
      {users.length == 0 ? (<h1>No users nearby</h1>) : (<h1>List of nearby users</h1>)}
      <ListGroup>
    
        {users ? (
          users.map((user) => (
            <ListGroupItem key={user.userId} style={{backgroundColor: "#f0f0f0", border: "none"}}>
              <UserCard user={user}></UserCard>
            </ListGroupItem>
          ))
        ) : (<div>No users found</div>)}
      </ListGroup>
    </div>
  )
}

export default Users
