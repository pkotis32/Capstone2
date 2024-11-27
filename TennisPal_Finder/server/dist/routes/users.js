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
const jsonschema_1 = __importDefault(require("jsonschema"));
const users_1 = __importDefault(require("../models/users"));
const court_locations_1 = __importDefault(require("../models/court_locations"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const expressError_1 = require("../expressError");
const expressError_2 = require("../expressError");
const userSaveAddress_json_1 = __importDefault(require("../schemas/userSaveAddress.json"));
const userSaveCourtAddress_json_1 = __importDefault(require("../schemas/userSaveCourtAddress.json"));
const geocode_api_1 = __importDefault(require("../helpers/geocode_api"));
const availabilities_1 = __importDefault(require("../models/availabilities"));
const auth_1 = require("../middleware/auth");
const distance_1 = __importDefault(require("../helpers/distance"));
// GET /users  () => [{user}]
// returns array of user objects {username, firstName, lastName, skillLevel, distance}
// calculates the distance from each user to the fetched user
// authorization required: logged in
router.get('/', auth_1.ensureLoggedIn, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let currLat;
        let currLng;
        let currUser;
        try {
            currUser = req.query.username;
            const response = yield users_1.default.get(currUser);
            ({ homeLat: currLat, homeLng: currLng } = response[0]);
        }
        catch (error) {
            return next(error);
        }
        try {
            const rows = yield users_1.default.findAll(currUser);
            const usersMap = new Map();
            for (let user of rows) {
                // retrieve each users location to calculate the distance from the current user
                let userLat = user.homeLat;
                let userLng = user.homeLng;
                let dist = (0, distance_1.default)(currLat, currLng, userLat, userLng);
                if (usersMap.has(user.userId)) {
                    usersMap.get(user.userId).availabilities.push(user.availability);
                }
                else {
                    usersMap.set(user.userId, {
                        userId: user.userId,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        skillLevel: user.skillLevel,
                        distance: dist,
                        availabilities: [user.availability]
                    });
                }
            }
            const usersArray = Array.from(usersMap.values());
            usersArray.sort((a, b) => a.distance - b.distance);
            res.json({ users: usersArray });
        }
        catch (error) {
            return next(error);
        }
    });
});
// GET /users:username  () => {userInfo}
// userInfo is object that contains {userId, username, firstName, lastName, homeAddress, homeLat, homeLng, courtName, courtLat, courtLng, availabilities}
// authorization required: logged in 
router.get('/:username', auth_1.ensureLoggedIn, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.params.username;
            const response = yield users_1.default.get(username);
            const userInfo = Object.assign({}, response[0]);
            delete userInfo.availability;
            const availabilities = [];
            for (let userInfo of response) {
                availabilities.push(userInfo.availability);
            }
            userInfo.availabilites = availabilities;
            res.json({ userInfo: userInfo });
        }
        catch (error) {
            return next(error);
        }
    });
});
// PATCH  /users/:username/saveAddress  (address) => null
// accepts address, saves user address by updating user table
// authorization required; correct user logged in
router.patch('/:username/save_address', auth_1.ensureCorrectUser, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.params;
            const validator = jsonschema_1.default.validate(req.body, userSaveAddress_json_1.default);
            if (!validator.valid) {
                const errs = validator.errors.map(e => e.stack);
                throw new expressError_1.BadRequestError(errs);
            }
            const { address } = req.body;
            const { lat, lng } = yield (0, geocode_api_1.default)(address);
            yield users_1.default.saveAddress(username, address, lat, lng);
            res.json({ message: "User address saved" });
        }
        catch (error) {
            return next(error);
        }
    });
});
// POST /users/:username/save_court_address   {courtName, address} => null
// accpets address, saves court address in database
// authorization required: correct user logged in
router.post('/:username/save_court_address', auth_1.ensureCorrectUser, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.params;
            let userId;
            try {
                const response = yield users_1.default.get(username);
                if (!response[0]) {
                    throw new expressError_2.NotFoundError("User not found.");
                }
                userId = response[0].userId;
            }
            catch (error) {
                return next(error);
            }
            const validator = jsonschema_1.default.validate(req.body, userSaveCourtAddress_json_1.default);
            if (!validator.valid) {
                const errs = validator.errors.map(e => e.stack);
                throw new expressError_1.BadRequestError(errs);
            }
            const { courtName, address } = req.body;
            let lat, lng;
            try {
                const location = yield (0, geocode_api_1.default)(address);
                lat = location.lat;
                lng = location.lng;
            }
            catch (error) {
                console.error("Error retrieving lat/lng:", error.message);
                return next(error);
            }
            try {
                yield court_locations_1.default.saveCourtAddress(userId, courtName, address, lat, lng);
                res.json({ message: "Court location saved" });
            }
            catch (error) {
                return next(error);
            }
        }
        catch (error) {
            return next(error);
        }
    });
});
// POST users/:username/save_availabilities   {availabilites} => ()
// availibilities is a string array, saves all user availabilities
// authorization required: correct user logged in
router.post('/:username/save_availabilities', auth_1.ensureCorrectUser, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.params;
        let userId;
        try {
            const response = yield users_1.default.get(username);
            if (!response[0]) {
                throw new expressError_1.BadRequestError("User not found.");
            }
            userId = response[0].userId;
        }
        catch (error) {
            return next(error);
        }
        const { availabilities } = req.body;
        try {
            yield availabilities_1.default.saveAvailabilities(userId, availabilities);
            res.json({ message: "Availabilities saved" });
        }
        catch (error) {
            return next(error);
        }
    });
});
exports.default = router;
