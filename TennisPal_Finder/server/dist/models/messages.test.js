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
const messages_1 = __importDefault(require("./messages"));
const _testCommon_1 = require("./_testCommon");
beforeAll(_testCommon_1.commonBeforeAll);
beforeEach(_testCommon_1.commonBeforeEach);
afterEach(_testCommon_1.commonAfterEach);
afterAll(_testCommon_1.commonAfterAll);
// test send message
describe("send message", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield messages_1.default.sendMessage(1, 2, "hi");
            expect(message).toEqual({
                "senderId": 1,
                "receiverId": 2,
                "message": "hi"
            });
        });
    });
});
// test get messages between users
describe("get messages", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield messages_1.default.getMessages(1, 2);
            expect(messages).toEqual([{
                    "messageId": expect.any(Number),
                    "messageText": "hello",
                    "receiverId": 2,
                    "senderId": 1,
                    "sentAt": expect.any(Date)
                }]);
        });
    });
});
