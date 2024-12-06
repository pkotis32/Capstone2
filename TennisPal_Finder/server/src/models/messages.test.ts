import {db} from '../db'
import Messages from './messages';

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


// test send message
describe("send message", function() {
  test("works", async function() {
    const message = await Messages.sendMessage(1, 2, "hi")
    expect(message).toEqual({
      "senderId": 1,
      "receiverId": 2,
      "message": "hi"
    })
  })
})


// test get messages between users
describe("get messages", function() {
  test("works", async function() {
    const messages = await Messages.getMessages(1, 2)
    expect(messages).toEqual([{
      "messageId": expect.any(Number),
      "messageText": "hello",
      "receiverId": 2,
      "senderId": 1,
      "sentAt": expect.any(Date)
    }])
  })
})