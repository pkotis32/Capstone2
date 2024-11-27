import express from 'express';
const router = express.Router();
import Users from '../models/users';
import Messages from '../models/messages';
import {ensureCorrectUser} from '../middleware/auth';


// POST /messages  {message} => () 
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


export default router