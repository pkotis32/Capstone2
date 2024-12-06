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
// test user login route
describe("POST /auth/token", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .post('/auth/token')
                .send({
                "username": "u1",
                "password": "password1"
            });
            expect(resp.body).toEqual({
                "token": expect.any(String)
            });
        });
    });
    test("unauthorized with wrong password", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .post('/auth/token')
                .send({
                "username": "u1",
                "password": "wrong"
            });
            expect(resp.statusCode).toEqual(401);
        });
    });
});
// test user register route
describe("POST /auth/register", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
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
            });
        });
    });
});
