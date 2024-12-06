import request from 'supertest';

import app from '../app'

import {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token
} from "./_testCommon";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// test get court locations route
describe("GET /court_locations", function() {
  test("works", async function(){
    const resp = await request(app)
        .get('/court_locations')
        .set("authorization", `Bearer ${u1Token}`)
    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toEqual({
      locations: [{
        "court_latitude": "180.000000",
        "court_longitude": "180.000000",
        "court_name": "Lions Park"
      }]
    })
  })
})