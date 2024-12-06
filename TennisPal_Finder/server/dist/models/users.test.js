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
const expressError_1 = require("../expressError");
const users_1 = __importDefault(require("./users"));
const _testCommon_1 = require("./_testCommon");
beforeAll(_testCommon_1.commonBeforeAll);
beforeEach(_testCommon_1.commonBeforeEach);
afterEach(_testCommon_1.commonAfterEach);
afterAll(_testCommon_1.commonAfterAll);
// authentication tests
describe("authenticate", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.authenticate('u1', 'password1');
            expect(user).toEqual({
                username: "u1",
                firstName: "U1F",
                lastName: "U1L",
                email: "u1@email.com",
                skillLevel: "beginner"
            });
        });
    });
    test("unauthorize if wrong password", function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield users_1.default.authenticate('u1', 'none');
            }
            catch (error) {
                expect(error instanceof expressError_1.UnauthorizedError).toBeTruthy();
            }
        });
    });
});
// register user tests
describe("register", function () {
    const newUser = {
        username: "new",
        firstName: "Test",
        lastName: "Tester",
        email: "test@test.com",
        skillLevel: "beginner",
    };
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield users_1.default.register(Object.assign(Object.assign({}, newUser), { password: "password" }));
            expect(user).toEqual(newUser);
        });
    });
    test("duplicate user", function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield users_1.default.register(Object.assign(Object.assign({}, newUser), { password: "password" }));
                yield users_1.default.register(Object.assign(Object.assign({}, newUser), { password: "password" }));
            }
            catch (error) {
                expect(error instanceof expressError_1.BadRequestError).toBeTruthy();
            }
        });
    });
});
// test for findAll users
describe("findAll users", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield users_1.default.findAll('u2');
            expect(users).toEqual([{
                    "availability": null,
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
                }]);
        });
    });
});
// test for getUser
describe("get user", function () {
    test("works", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.get('u1');
            expect(user).toEqual([{
                    "availability": null,
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
                    "username": "u1"
                }]);
        });
    });
});
