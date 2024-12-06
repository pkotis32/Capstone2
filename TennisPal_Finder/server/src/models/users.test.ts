import {
  BadRequestError,
  UnauthorizedError,
} from "../expressError";
import {db} from '../db'
import Users from './users'

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


// authentication tests
describe("authenticate", function() {
  test("works", async function() {
    const user = await Users.authenticate('u1', 'password1');
    expect(user).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      skillLevel: "beginner"
    });
  })

  test("unauthorize if wrong password", async function() {
    try {
      await Users.authenticate('u1', 'none');
    } catch (error) {
      expect(error instanceof UnauthorizedError).toBeTruthy();
    }
  })

})


// register user tests
describe("register", function() {
  const newUser = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
    email: "test@test.com",
    skillLevel: "beginner",
  };
  
  test("works", async function() {
    
    let user = await Users.register({
      ...newUser,
      password: "password",
    });

    expect(user).toEqual(newUser)
  })

  test("duplicate user", async function() {
    try {
      await Users.register({
        ...newUser,
        password: "password",
      });
      await Users.register({
        ...newUser,
        password: "password",
      });
    } catch (error) {
      expect(error instanceof BadRequestError).toBeTruthy();
    }
    
  })
})


// test for findAll users
describe("findAll users", function() {
  test("works", async function() {
    const users = await Users.findAll('u2');
    expect(users).toEqual([{
      "availability": null,
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
    }])
  })
})



// test for getUser
describe("get user", function() {
  test("works", async function() {
    const user = await Users.get('u1');
    expect(user).toEqual([{
      "availability": null, 
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
      "username": "u1"
    }])
  })
})