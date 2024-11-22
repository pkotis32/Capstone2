import jsonschema from 'jsonschema';
import {createToken} from '../helpers/tokens';
import {User} from '../models/user';
import express from 'express';
const router = express.Router();
import { BadRequestError } from '../expressError';


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
    const users: UserInfo[] = await User.findAll();
    res.json({users})
  } catch (error) {
    return next(error)
  }

});


export default router