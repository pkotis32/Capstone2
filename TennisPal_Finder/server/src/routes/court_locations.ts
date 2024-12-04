import express from 'express';
const router = express.Router();
import {ensureLoggedIn} from '../middleware/auth';
import Court_locations from '../models/court_locations';



// GET  /court_locations  () => [{courtLocation}]
// returns all court locations where court location is {courtName, courtLat, courtLng}
// authorization required: logged in
router.get('/', ensureLoggedIn, async function (req, res, next) {

  const response = await Court_locations.getCourtLocations();
  res.json({locations: response})
})

export default router;