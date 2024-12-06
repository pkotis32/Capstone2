import {db} from '../db'
import Court_locations from './court_locations'

import {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} from './_testCommon';

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// test save court location
describe("save court location", function() {
  test("works", async function () {
    const location = await Court_locations.saveCourtAddress(1, 'newCourt', 'address', 180, 180);
    expect(location).toEqual({
      "courtLatitude": "180.000000",
      "courtLongitude": "180.000000",
      "courtName": "newCourt",
      "userId": 1,
    })
  })
})


// test get saved court addresses
describe("get court addresses", function() {
  test("works", async function() {
    const courts = await Court_locations.getCourtLocations();
    expect(courts).toEqual([{
      "court_latitude": "180.000000",
      "court_longitude": "180.000000",
      "court_name": "Lions Park",
    }])
  })
})