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
exports.u2Token = exports.u1Token = void 0;
exports.commonAfterAll = commonAfterAll;
exports.commonAfterEach = commonAfterEach;
exports.commonBeforeAll = commonBeforeAll;
exports.commonBeforeEach = commonBeforeEach;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const db_1 = require("../db");
const tokens_1 = require("../helpers/tokens");
function commonBeforeAll() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.query('DELETE FROM users');
        yield db_1.db.query('DELETE FROM messages');
        yield db_1.db.query('DELETE FROM court_locations');
        yield db_1.db.query('DELETE FROM user_availabilities');
        yield db_1.db.query(`
    INSERT INTO users(user_id,
                      username,
                      password,
                      first_name,
                      last_name,
                      email,
                      skill_level)
    VALUES (1, 'u1', $1, 'U1F', 'U1L', 'u1@email.com', 'beginner'),
           (2, 'u2', $2, 'U2F', 'U2L', 'u2@email.com', 'beginner')
    RETURNING username`, [
            yield bcrypt_1.default.hash("password1", config_1.BCRYPT_WORK_FACTOR),
            yield bcrypt_1.default.hash("password2", config_1.BCRYPT_WORK_FACTOR),
        ]);
        yield db_1.db.query(`
    INSERT INTO court_locations
    (user_id, court_name, court_address, court_latitude, court_longitude)
    VALUES ($1, $2, $3, $4, $5)`, [1, 'Lions Park', 'Lions Park', 180, 180]);
        yield db_1.db.query(`
    INSERT INTO messages
    (sender_id, receiver_id, message_text)
    VALUES ($1, $2, $3)`, [1, 2, 'hello']);
    });
}
function commonBeforeEach() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.query("BEGIN");
    });
}
function commonAfterEach() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.query("ROLLBACK");
    });
}
function commonAfterAll() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.end();
    });
}
const u1Token = (0, tokens_1.createToken)({ username: "u1", firstName: 'u1F', lastName: 'u1L', email: 'u1@gmail.com', skillLevel: 'beginner' });
exports.u1Token = u1Token;
const u2Token = (0, tokens_1.createToken)({ username: "u2", firstName: 'u2F', lastName: 'u2L', email: 'u2@gmail.com', skillLevel: 'beginner' });
exports.u2Token = u2Token;
