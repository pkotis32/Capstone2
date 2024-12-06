import {db} from '../db'
import Availabilites from './availabilities'

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


// test save user availabilities
describe("save user availabilities", function() {
  test("works", async function() {
    const availabilities = await Availabilites.saveAvailabilities(1, ["Monday", "Tuesday"]);
    expect(availabilities).toEqual([
      {
        "dayOfWeek": "Monday",
        "userId": 1,
      },
      {
        "dayOfWeek": "Tuesday",
        "userId": 1,
      }
    ])
  })
})