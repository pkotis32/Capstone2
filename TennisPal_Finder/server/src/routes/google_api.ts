import express from 'express';
import axios from 'axios';
import court_locations from '../models/court_locations';
import Users from '../models/users'

const router = express.Router();

const BASE_API = 'https://maps.googleapis.com/maps/api/geocode/json'
const API_KEY = 'AIzaSyBJH3OKaWYrm3RiNkabZCCfyfM9Z2m0PLk'



// POST /api/save_address:username  {court_name, address} => "successful save message"
// court_name and address is passd int req.body, should save the address string as well as the latitude and longitude
// authorization required: logged in user
router.post('/save_address/:username', async function (req, res, next) {
  const username = req.params.username;
  const {court_name, address} = req.body;
  const encodedAddress = encodeURIComponent(address);
  try {

    const userId = await Users.get(username)
    const response = await axios.get(`${BASE_API}?address=${encodedAddress}&key=${API_KEY}`)

    let data = response.data

    const {lat, lng} = data.results[0].geometry.location;
    const location = await court_locations.save_address(userId, court_name, address, lat, lng);
    
    res.json({location});
    
  } catch (error: any) {
    return next(error);
  }
})

export default router;