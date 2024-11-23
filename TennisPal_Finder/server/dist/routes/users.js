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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const expressError_1 = require("../expressError");
const userSaveAddress_json_1 = __importDefault(require("../schemas/userSaveAddress.json"));
const geocode_api_1 = __importDefault(require("../helpers/geocode_api"));
// GET /users  () => {user}
// returns user as {username, firstName, lastName, skillLevel}
// authorization none
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield users_1.default.findAll();
            res.json({ users });
        }
        catch (error) {
            return next(error);
        }
    });
});
// GET /users:username  () => userId
// returns the userId from the given username
// authorization required: none
router.get('/:username', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.params.username;
            const userId = yield users_1.default.get(username);
            res.json({ userId });
        }
        catch (error) {
            return next(error);
        }
    });
});
// POST /users/saveAddress/:username  (address) => {location}
// saves user address, return location object {address, latitude, longitude}
// authorization required; user logged in
router.patch('/:username/save_address', function (req, res, next) {
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
exports.default = router;
