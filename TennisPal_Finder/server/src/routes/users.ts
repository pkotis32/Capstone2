import jsonschema from 'jsonschema';
import {createToken} from '../helpers/tokens';
import Users from '../models/users';
import express from 'express';
const router = express.Router();
import { BadRequestError } from '../expressError';
import { stripVTControlCharacters } from 'util';


// GET /users  () => {user}
// returns user as {username, firstName, lastName, skillLevel}
// authorization none

router.get('/', async function (req, res, next) {

  interface UserInfo {
    username: string,
    firstName: string,
    lastName: string,
    skillLevel: string
  }

  try {
    const users: UserInfo[] = await Users.findAll();
    res.json({users})
  } catch (error) {
    return next(error)
  }


});


//GET /users:username  () => userId
// returns the userId from the given username
// authorization required: none
router.get('/:username', async function(req, res, next) {
  try {
    const username = req.params.username;
    const userId = await Users.get(username);
    res.json({userId})
  } catch (error) {
    return next(error);
  }  
})


export default router