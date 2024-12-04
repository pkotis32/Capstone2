import React, {useContext, useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
import TennisApi from '../api';
import UserContext from './UserContext';
import TokenContext from './TokenContext';
import MessageCard from './MessageCard';
import {ListGroup, ListGroupItem} from 'reactstrap'
import './Message.css'



interface MessageInfo {
  messageId: number,
  senderId: number,
  receiverId: number, 
  messageText: string,
  sentAt: string
}

// component that allows a user to message another user, and shows all messages between the users
const Message = () => {
  

  

  const sender = useContext(UserContext);
  const token = useContext(TokenContext)
  // retrieve the username from the url params
  const {username: receiver} = useParams<{username: string}>();
  
  // save the sender and receiver ids in state
  const [senderId, setSenderId] = useState<number>(0);
  const [receiverId, setReceiverId] = useState<number>(0);

  // save the message in state
  const [newMessage, setNewMessage] = useState<string>("")
  // save the existing messages in state
  const [currMessages, setCurrMessages] = useState<MessageInfo[]>([])

   // retrieve sender and receiver ids
   useEffect(() => {
    try {
      const getIds = async () => {
        const response1 = await TennisApi.getUser(sender, token);
        const response2 = await TennisApi.getUser(receiver!, token);
        let senderId = response1.userInfo.userId;
        let receiverId = response2.userInfo.userId;
        setSenderId(senderId);
        setReceiverId(receiverId);
        const messages: MessageInfo[] = await TennisApi.getMessages(senderId, sender, receiverId, token);
        setCurrMessages(messages);
      }
      getIds();
    } catch (error) {
      console.error(error);
    }  
  }, [newMessage])


  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current!.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [currMessages]);


  // update the message as the user types it
  const handleChange = (e: any) => {
    setNewMessage(e.target.value);
  }
  
  // save the message in the database
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await TennisApi.sendMessage(sender, receiver!, newMessage, token);
    setNewMessage("");
  }

  return (
    <div className="message-container">
      <h1>Message {receiver}</h1>
      <div className="mt-5 ref={messagesContainerRef} mb-3">
        <ListGroup className="messages">
          {currMessages.map((message) => (
            <ListGroupItem key={message.messageId}>
              <MessageCard message={message} senderId={senderId} receiverId={receiverId}></MessageCard>
            </ListGroupItem>
          ))}
          <div ref={messagesEndRef} />
        </ListGroup>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="message-area">
          <input
            type="text"
            value={newMessage}
            onChange={handleChange}
            placeholder="Enter your message"
            required
          />
          <button className="btn btn-primary ms-3"type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default Message
