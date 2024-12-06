"use strict";

import bcrypt from 'bcrypt'
import { BCRYPT_WORK_FACTOR } from '../config';
import {db} from '../db'
import {createToken} from  "../helpers/tokens";

async function commonBeforeAll () {

  await db.query('DELETE FROM users');
  await db.query('DELETE FROM messages');
  await db.query('DELETE FROM court_locations');
  await db.query('DELETE FROM user_availabilities');

  await db.query(`
    INSERT INTO users(user_id,
                      username,
                      password,
                      first_name,
                      last_name,
                      email,
                      skill_level)
    VALUES (1, 'u1', $1, 'U1F', 'U1L', 'u1@email.com', 'beginner'),
           (2, 'u2', $2, 'U2F', 'U2L', 'u2@email.com', 'beginner')
    RETURNING username`,
  [
    await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
    await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
  ]);


  await db.query(`
    INSERT INTO court_locations
    (user_id, court_name, court_address, court_latitude, court_longitude)
    VALUES ($1, $2, $3, $4, $5)`,
    [1, 'Lions Park', 'Lions Park', 180, 180]
  )


  await db.query(`
    INSERT INTO messages
    (sender_id, receiver_id, message_text)
    VALUES ($1, $2, $3)`,
    [1, 2, 'hello']
  );

}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", firstName: 'u1F', lastName: 'u1L', email: 'u1@gmail.com', skillLevel: 'beginner'});
const u2Token = createToken({ username: "u2", firstName: 'u2F', lastName: 'u2L', email: 'u2@gmail.com', skillLevel: 'beginner'});



export {commonAfterAll, commonAfterEach, commonBeforeAll, commonBeforeEach, u1Token, u2Token}