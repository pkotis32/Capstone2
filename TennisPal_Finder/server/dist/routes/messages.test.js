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
// test save message route
describe("POST /messages/:username", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .post('/messages/u1')
                .send({
                receiver: "u2",
                message: "hello"
            })
                .set("authorization", `Bearer ${_testCommon_1.u1Token}`);
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual({
                message: "message sent"
            });
        });
    });
});
// test get all messages a user is involved in 
describe("GET /messages/:usernmae", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .get('/messages/u1')
                .set("authorization", `Bearer ${_testCommon_1.u1Token}`)
                .query({
                senderId: 1,
                receiverId: 2
            });
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual([
                { "messageId": expect.any(Number), "messageText": "hello", "receiverId": 2, "senderId": 1, "sentAt": expect.any(String) }
            ]);
        });
    });
});
// test get all users a user has a chat with
describe("GET /messages/chats/:username", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(app_1.default)
                .get('/messages/chats/u1')
                .query({ senderId: "1" })
                .set("authorization", `Bearer ${_testCommon_1.u1Token}`);
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual({
                users: [{
                        username: "u2"
                    }]
            });
        });
    });
});
