"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_WORK_FACTOR = exports.PORT = exports.SECRET_KEY = void 0;
exports.getDatabaseUri = getDatabaseUri;
/** Shared config for application; can be required many places. */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("colors");
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
exports.SECRET_KEY = SECRET_KEY;
const PORT = process.env.PORT || '3001';
exports.PORT = PORT;
// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "postgresql:///tennis_pal_test"
        : process.env.DATABASE_URL || "postgresql://postgres.jsqivmwkegtabekjmuhs:BassetHound2001$@aws-0-us-west-1.pooler.supabase.com:6543/postgres";
}
// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
exports.BCRYPT_WORK_FACTOR = BCRYPT_WORK_FACTOR;
console.log("Jobly Config:".green);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");
