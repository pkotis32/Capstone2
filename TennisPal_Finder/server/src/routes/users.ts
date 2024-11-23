import jsonschema from 'jsonschema';
import {createToken} from '../helpers/tokens';
import Users from '../models/users';
import express from 'express';
const router = express.Router();
import { BadRequestError } from '../expressError';
import saveAddressSchema from '../schemas/userSaveAddress.json'
import getLatLng from '../helpers/geocode_api';


// GET /users  () => {user}
// returns user as {username, firstName, lastName, skillLevel}
// authorization none

router.get('/', async function (req, res, next) {

  interface UserInfo {
    username: string,
    firstName: string,
    lastName: string,
    skillLevel: string,
    courtName: string,
    address: string,
    latitude: number,
    longitude: number
  }

  try {
    const users: UserInfo = await Users.findAll();
    res.json({users})
  } catch (error) {
    return next(error)
  }


});


// GET /users:username  () => userId
// returns the userId from the given username
// authorization required: none
router.get('/:username', async function(req, res, next) {
  try {
    const username = req.params.username;
    const userId: number = await Users.get(username);
    res.json({userId})
  } catch (error) {
    return next(error);
  }  
})


// POST /users/saveAddress/:username  (address) => {location}
// saves user address, return location object {address, latitude, longitude}
// authorization required; user logged in
router.patch('/:username/save_address', async function (req, res, next) {
  try {

    const {username} = req.params
    const validator = jsonschema.validate(req.body, saveAddressSchema);
    if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
    }

    const {address}: {address: string} = req.body;
    const {lat, lng} = await getLatLng(address);

    await Users.saveAddress(username, address, lat, lng)
    res.json({message: "User address saved"})

  } catch (error) {
    return next(error)
  }
})
export default router