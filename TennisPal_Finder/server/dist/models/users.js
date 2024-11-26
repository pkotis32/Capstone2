"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const expressError_1 = require("../expressError");
const config_1 = require("../config");
// handles methods that interact with the users table in the database
class Users {
    // authenticate user with username and password
    // returns user info {username, first_name, last_name, email, skillLevel}
    // throws unauthorized error if user is not found or wrong password
    static authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`SELECT username,
                    password,
                    first_name as "firstName",
                    last_name as "lastName",
                    email,
                    skill_level as "skillLevel"
            FROM users
            WHERE username = $1`, [username]);
            const user = result.rows[0];
            if (user) {
                // compare the hashed password to the one that was enterred
                const isValid = yield bcrypt_1.default.compare(password, user.password);
                if (isValid === true) {
                    delete user.password;
                    return user;
                }
            }
            // throw error if user was not found in the database
            throw new expressError_1.UnauthorizedError("Invalid username/password");
        });
    }
    // register new user
    // returns user info {username, first_name, last_name, email, skillLevel}
    // throws bad request error if a duplicate user was found
    static register(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, firstName, lastName, email, skillLevel }) {
            const duplicateCheck = yield db_1.db.query(`SELECT username 
            FROM users
            WHERE username = $1`, [username]);
            if (duplicateCheck.rows[0]) {
                throw new expressError_1.BadRequestError(`Duplicate username: ${username}`);
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, config_1.BCRYPT_WORK_FACTOR);
            const result = yield db_1.db.query(`INSERT INTO users 
            (username, password, first_name, last_name, email, skill_level)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING username, first_name as "firstName", last_name as "lastName", email, skill_level as "skillLevel"`, [username, hashedPassword, firstName, lastName, email, skillLevel]);
            const user = result.rows[0];
            return user;
        });
    }
    // gets all profile info for all users, including courtLocations and availabilities
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    skill_level AS "skillLevel",
                    court_name AS "courtName",
                    address,
                    latitude,
                    longitude
            FROM users
            LEFT JOIN court_locations
            ON users.user_id = court_locations.user_id
            ORDER BY username`);
            return result.rows;
        });
    }
    static get(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`SELECT users.user_id AS "userId",
                    users.username,
                    users.first_name AS "firstName",
                    users.last_name AS "lastName",
                    users.address AS "homeAddress",
                    users.latitude AS "homeLat",
                    users.longitude AS "homeLng",
                    court_name AS "courtName",
                    court_locations.court_address AS "courtAddress",
                    court_locations.court_latitude AS "courtLat",
                    court_locations.court_longitude AS "courtLng",
                    user_availabilities.day_of_week AS "availability"
            FROM users
            LEFT JOIN court_locations ON users.user_id = court_locations.user_id
            LEFT JOIN user_availabilities ON users.user_id = user_availabilities.user_id
            WHERE username = $1`, [username]);
            return result.rows;
        });
    }
    static saveAddress(username, address, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`UPDATE users 
             SET address = $1, latitude = $2, longitude = $3
             WHERE username = $4`, [address, latitude, longitude, username]);
        });
    }
}
exports.default = Users;
