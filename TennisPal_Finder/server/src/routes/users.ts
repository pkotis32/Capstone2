import jsonschema from 'jsonschema';
import {createToken} from '../helpers/tokens';
import Users from '../models/users';
import Court_locations from '../models/court_locations'
import express from 'express';
const router = express.Router();
import { BadRequestError } from '../expressError';
import { NotFoundError } from '../expressError';
import saveAddressSchema from '../schemas/userSaveAddress.json'
import saveCourtAddressSchema from '../schemas/userSaveCourtAddress.json'
import getLatLng from '../helpers/geocode_api';
import Availabilities from '../models/availabilities';
import { ensureCorrectUser, ensureLoggedIn } from '../middleware/auth';


// GET /users  () => {user}
// returns user as {username, firstName, lastName, skillLevel}
// authorization required: logged in

router.get('/', ensureLoggedIn, async function (req, res, next) {

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


// GET /users:username  () => {userInfo}
// userInfo is object that contains {userId, username, firstName, lastName, homeAddress, homeLat, homeLng, courtName, courtLat, courtLng, availabilities}
// authorization required: logged in 
router.get('/:username', ensureLoggedIn, async function(req, res, next) {
  try {
    const username: string = req.params.username;
    const response = await Users.get(username);
    
    const userInfo = {...response[0]}
    delete userInfo.availability
    const availabilities: string[] = [];
    for (let userInfo of response) {
      availabilities.push(userInfo.availability);
    }
    userInfo.availabilites = availabilities;

    res.json({userInfo: userInfo})
  } catch (error) {
    return next(error);
  }  
})


// PATCH  /users/:username/saveAddress  (address) => null
// accepts address, saves user address by updating user table
// authorization required; correct user logged in
router.patch('/:username/save_address', ensureCorrectUser, async function (req, res, next) {
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



// POST /users/:username/save_court_address   {courtName, address} => null
// accpets address, saves court address in database
// authorization required: correct user logged in
router.post('/:username/save_court_address', ensureCorrectUser, async function (req, res, next) {
  try {
    const { username } = req.params;

    let userId;
    try {
      const response = await Users.get(username);
      if (!response[0]) {
        throw new NotFoundError("User not found.");
      }
      userId = response[0].userId;
    } catch (error: any) {
      return next(error)
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
      return next(error);
    }

    try {
      await Court_locations.saveCourtAddress(userId, courtName, address, lat, lng);
      res.json({ message: "Court location saved" });
    } catch (error: any) {
      return next(error);
    }

  } catch (error) {
    return next(error);
  }

});



// POST users/:username/save_availabilities   {availabilites} => ()
// availibilities is a string array, saves all user availabilities
// authorization required: correct user logged in
router.post('/:username/save_availabilities', ensureCorrectUser, async function (req, res, next) {
  
  const { username } = req.params;

  let userId;
  try {
    const response = await Users.get(username);
    if (!response[0]) {
      throw new BadRequestError("User not found.");
    }
    userId = response[0].userId;
  } catch (error: any) {
    return next(error);
  }

  const {availabilities}: {availabilities: string[]} = req.body

  try {
    await Availabilities.saveAvailabilities(userId, availabilities);
    res.json({message: "Availabilities saved"})
  } catch (error) {
    return next(error);
  }

})

export default router;