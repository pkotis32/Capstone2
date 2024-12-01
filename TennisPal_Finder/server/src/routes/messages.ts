import express from 'express';
const router = express.Router();
import Users from '../models/users';
import Messages from '../models/messages';
import {ensureCorrectUser} from '../middleware/auth';


// POST /messages/:username  {message} => () 
// saves message in database, message object passed in contains {sender, receiver, message}
// authorization required: correct user logged in
router.post('/:username', ensureCorrectUser, async (req, res, next) => {

  const {username: sender} = req.params;
  const {receiver, message} = req.body;

  
  try {
    // get the sender and receiver Id's for the next query
    let senderId;
    let receiverId;
    const response1 = await Users.get(sender);
    senderId = response1[0].userId;
    const response2 = await Users.get(receiver);
    receiverId = response2[0].userId;

    await Messages.sendMessage(senderId, receiverId, message)

    res.json({message: "message sent"})

  } catch (error: any) {
    return next(error)
  }

})


// GET /messages/:username   (receiver) => [{message}]
// the sender is passed as a query param
// returns array of message objects {sender, receiver, message, sentAt}
// authorization required: correct user logged in
router.get('/:username', ensureCorrectUser, async (req, res, next) => {

  interface messageResponse {
    messageId: number,
    senderId: number,
    receiverId: number,
    messageText: string,
    sentAt: string;
  }

  const {senderId, receiverId} = req.query;
  const sender = Number(senderId);
  const receiver = Number(receiverId);

  
  try {
    const response: messageResponse[] = await Messages.getMessages(sender, receiver)
    
    let newResponse = response.map(message => {
      const fullDate = new Date(message.sentAt).toLocaleDateString();
      const time = new Date(message.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newResponse = {...message, sentAt: `${fullDate} ${time}`}
      return newResponse;
    })

    res.json(newResponse)
  } catch (error) {
    return next(error)
  }
})


// GET /messages/chats/:username   () => [users]
// the sender is passed as a query param
// an array of users that the sender has a chat with is returned
// authorization required: correct user logged in
router.get('/chats/:username', ensureCorrectUser, async (req, res, next) => {
  const {senderId} = req.query;
  const sender = Number(senderId);

  try {
    const response: string[] = await Messages.getUserChats(sender);
    res.json({users: response})
  } catch (error) {
    return next(error);
  }
})  

export default router