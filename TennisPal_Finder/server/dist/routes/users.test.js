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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const _testCommon_1 = require("./_testCommon");
beforeAll(_testCommon_1.commonBeforeAll);
beforeEach(_testCommon_1.commonBeforeEach);
afterEach(_testCommon_1.commonAfterEach);
afterAll(_testCommon_1.commonAfterAll);
// test get current users route
describe("GET /users", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .get('/users')
                .query({ "username": "u1" })
                .set("authorization", `Bearer ${_testCommon_1.u1Token}`);
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual({
                users: [{ "availabilities": [null], "distance": 0, "firstName": "U2F", "lastName": "U2L", "skillLevel": "beginner", "userId": 2, "username": "u2" }]
            });
        });
    });
});
// test get specific user information route
describe("GET /users/:username", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .get('/users/u1')
                .set("authorization", `Bearer ${_testCommon_1.u1Token}`);
            expect(resp.statusCode).toEqual(200);
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
            });
        });
    });
});
// test patch user route which updates user's address
describe("PATCH /users/:username/save_address", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .patch('/users/u1/save_address')
                .set("authorization", `Bearer ${_testCommon_1.u1Token}`)
                .send({
                address: "7 W Hiawatha Trail"
            });
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual({
                message: "User address saved"
            });
        });
    });
});
// test save user court address route
describe("POST /users/:username/save_court_address", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .post('/users/u2/save_court_address')
                .set("authorization", `Bearer ${_testCommon_1.u2Token}`)
                .send({
                courtName: "Palatine Hills",
                address: "Palatine Hills, Palatine, IL 60074"
            });
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual({
                message: "Court location saved"
            });
        });
    });
});
// test save user availabilities route
describe("POST /users/:username/save_availabilities", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .post('/users/u1/save_availabilities')
                .set("authorization", `Bearer ${_testCommon_1.u1Token}`)
                .send({ availabilities: ["Monday", "Tuesday"] });
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual({
                message: "Availabilities saved"
            });
        });
    });
});
