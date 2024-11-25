import jsonschema from 'jsonschema';
import {createToken} from '../helpers/tokens';
import Users from '../models/users';
import express from 'express';
const router = express.Router();
import { BadRequestError } from '../expressError';
import saveAddressSchema from '../schemas/userSaveAddress.json'
import saveCourtAddressSchema from '../schemas/userSaveCourtAddress.json'
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
    const response = await Users.get(username);
    res.json({userInfo: response})
  } catch (error) {
    return next(error);
  }  
})


// PATCH  /users/:username/saveAddress  (address) => null
// accepts address, saves user address by updating user table
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



// POST /users/:username/save_court_address   (address) => null
// accpets address, saves court address in database
// authorization required: user logged in
router.post('/:username/save_court_address', async function (req, res, next) {
  try {
    const { username } = req.params;

    let userId;
    try {
      const response = await Users.get(username);
      if (!response[0]) {
        throw new BadRequestError("User not found.");
      }
      userId = response[0].userId;
    } catch (error: any) {
      console.error("Error fetching user data:", error.message);
      throw new BadRequestError("Failed to fetch user information.");
    }

    const validator = jsonschema.validate(req.body, saveCourtAddressSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { courtName, address } = req.body;

    let lat, lng;
    try {
      const location = await getLatLng(address);
      lat = location.lat;
      lng = location.lng;
    } catch (error: any) {
      console.error("Error retrieving lat/lng:", error.message);
      throw new BadRequestError("Failed to find court. Please check the address.");
    }

    try {
      await Users.saveCourtAddress(userId, courtName, address, lat, lng);
      res.json({ message: "Court location saved" });
    } catch (error: any) {
      console.error("Error saving court address:", error.message);
      throw new BadRequestError(error.message);
    }

  } catch (error) {
    return next(error);
  }

});

export default router