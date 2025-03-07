"use strict";

/** Shared config for application; can be required many places. */

import dotenv from 'dotenv';
dotenv.config();
import "colors";

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = process.env.PORT || '3001';

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "postgresql:///tennis_pal_test"
      : process.env.DATABASE_URL || "postgresql://postgres.jsqivmwkegtabekjmuhs:BassetHound2001$@aws-0-us-west-1.pooler.supabase.com:6543/postgres";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR: number = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

export {SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, getDatabaseUri};
  
  
