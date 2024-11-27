import React, {useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import TennisApi from '../api';
import UserContext from './UserContext';
import TokenContext from './TokenContext';

const Message = () => {
  
  const sender = useContext(UserContext);
  const token = useContext(TokenContext)
  // retrieve the username from the url params
  const {username: receiver} = useParams<{username: string}>();
  
  // save the message in state
  const [message, setMessage] = useState<string>("")

  // update the message as the user types it
  const handleChange = (e: any) => {
    setMessage(e.target.value);
  }
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await TennisApi.sendMessage(sender, receiver!, message, token);
    setMessage("");
  }

  return (
    <div>
      <h1>Message {receiver}</h1>
      <div className="messages mt-5">
      
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Enter your message"
          required
        />
        <button className="btn btn-primary ms-3"type="submit">Send</button>
      </form>
    </div>
  )
}

export default Message
