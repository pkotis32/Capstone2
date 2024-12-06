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



// test save message route
describe("POST /messages/:username", function() {
  test("works", async function() {
    const resp = await request(app)
        .post('/messages/u1')
        .send({
          receiver: "u2",
          message: "hello"
        })
        .set("authorization", `Bearer ${u1Token}`)
    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toEqual({
      message: "message sent"
    })
  })
})


// test get all messages a user is involved in 
describe("GET /messages/:usernmae", function() {
  test("works", async function() {
    const resp = await request(app)
      .get('/messages/u1')
      .set("authorization", `Bearer ${u1Token}`)
      .query({
        senderId: 1,
        receiverId: 2
      })
    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toEqual([
      {"messageId": expect.any(Number), "messageText": "hello", "receiverId": 2, "senderId": 1, "sentAt": expect.any(String)}
    ])
  })
})


// test get all users a user has a chat with
describe("GET /messages/chats/:username", function() {
  test("works", async function() {
    const resp = await request(app)
        .get('/messages/chats/u1')
        .query({senderId: "1"})
        .set("authorization", `Bearer ${u1Token}`)
    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toEqual({
      users: [{
        username: "u2"
      }]
    })
  })
})