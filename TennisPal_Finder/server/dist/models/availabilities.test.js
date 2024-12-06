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
const availabilities_1 = __importDefault(require("./availabilities"));
const _testCommon_1 = require("./_testCommon");
beforeAll(_testCommon_1.commonBeforeAll);
beforeEach(_testCommon_1.commonBeforeEach);
afterEach(_testCommon_1.commonAfterEach);
afterAll(_testCommon_1.commonAfterAll);
// test save user availabilities
describe("save user availabilities", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const availabilities = yield availabilities_1.default.saveAvailabilities(1, ["Monday", "Tuesday"]);
            expect(availabilities).toEqual([
                {
                    "dayOfWeek": "Monday",
                    "userId": 1,
                },
                {
                    "dayOfWeek": "Tuesday",
                    "userId": 1,
                }
            ]);
        });
    });
});
