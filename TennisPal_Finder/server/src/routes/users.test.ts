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


// test get current users route
describe("GET /users", function() {
  test("works", async function() {
    const resp = await request(app)
        .get('/users')
        .query({"username": "u1"})
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      users: [{"availabilities": [null], "distance": 0, "firstName": "U2F", "lastName": "U2L", "skillLevel": "beginner", "userId": 2, "username": "u2"}]
    })
  })
})


// test get specific user information route
describe("GET /users/:username", function() {
  test("works", async function() {
    const resp = await request(app)
        .get('/users/u1')
        .set("authorization", `Bearer ${u1Token}`)
    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toEqual({
      userInfo: {
         "availabilites": [null],
         "courtAddress": "Lions Park",
         "courtLat": "180.000000",
         "courtLng": "180.000000",
         "courtName": "Lions Park",
         "firstName": "U1F",
         "homeAddress": null,
         "homeLat": null,
         "homeLng": null,
         "lastName": "U1L",
         "skillLevel": "beginner",
         "userId": 1,
         "username": "u1",
      }
    })
  })
})


// test patch user route which updates user's address
describe("PATCH /users/:username/save_address", function() {
  test("works", async function() {
    const resp = await request(app)
        .patch('/users/u1/save_address')
        .set("authorization", `Bearer ${u1Token}`)
        .send({
          address: "7 W Hiawatha Trail"
        })
    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toEqual({
      message: "User address saved"
    })
  })
})



// test save user court address route
describe("POST /users/:username/save_court_address", function() {
  test("works", async function() {
    const resp = await request(app)
        .post('/users/u2/save_court_address')
        .set("authorization", `Bearer ${u2Token}`)
        .send({
          courtName: "Palatine Hills",
          address: "Palatine Hills, Palatine, IL 60074"
        })
    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toEqual({
      message: "Court location saved"
    })
  })
})


// test save user availabilities route
describe("POST /users/:username/save_availabilities", function() {
  test("works", async function() {
    const resp = await request(app)
        .post('/users/u1/save_availabilities')
        .set("authorization", `Bearer ${u1Token}`)
        .send({availabilities: ["Monday", "Tuesday"]})
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      message: "Availabilities saved"
    })
  })
})
