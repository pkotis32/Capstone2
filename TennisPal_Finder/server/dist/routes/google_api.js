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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const court_locations_1 = __importDefault(require("../models/court_locations"));
const users_1 = __importDefault(require("../models/users"));
const router = express_1.default.Router();
const BASE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = 'AIzaSyBJH3OKaWYrm3RiNkabZCCfyfM9Z2m0PLk';
// POST /api/save_address:username  {court_name, address} => "successful save message"
// court_name and address is passd int req.body, should save the address string as well as the latitude and longitude
// authorization required: logged in user
router.post('/save_address/:username', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        const { court_name, address } = req.body;
        const encodedAddress = encodeURIComponent(address);
        try {
            const userId = yield users_1.default.get(username);
            const response = yield axios_1.default.get(`${BASE_API}?address=${encodedAddress}&key=${API_KEY}`);
            let data = response.data;
            const { lat, lng } = data.results[0].geometry.location;
            const location = yield court_locations_1.default.save_address(userId, court_name, address, lat, lng);
            res.json({ location });
        }
        catch (error) {
            return next(error);
        }
    });
});
exports.default = router;
