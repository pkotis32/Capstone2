import request from 'supertest';

import app from '../app'

import {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} from "./_testCommon";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// test user login route
describe("POST /auth/token", function() {
  test("works", async function() {
    const resp = await request(app)
        .post('/auth/token')
        .send({
          "username": "u1",
          "password": "password1"
        })
    expect(resp.body).toEqual({
      "token": expect.any(String)
    })
  })

  test("unauthorized with wrong password", async function() {
    const resp = await request(app)
        .post('/auth/token')
        .send({
          "username": "u1",
          "password": "wrong"
        })
    expect(resp.statusCode).toEqual(401)
  })
})



// test user register route
describe("POST /auth/register", function() {
  test("works", async function() {
    const resp = await request(app)
        .post('/auth/register')
        .send({
          username: "new",
          firstName: "first",
          lastName: "last",
          password: "password",
          email: "new@email.com",
          skillLevel: "beginner"
        });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      token: expect.any(String)
    })
  })
})