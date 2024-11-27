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
const router = express_1.default.Router();
const BASE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = "AIzaSyBJH3OKaWYrm3RiNkabZCCfyfM9Z2m0PLk";
// POST /api/save_address  {address} => "successful save message"
// address is passd int req.body, should save the address string as well as the latitude and longitude
// authorization required: logged in user
router.post('/save_address', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address } = req.body;
        const encodedAddress = encodeURIComponent(address);
        try {
            const resp = axios_1.default.get(BASE_API, {
                params: {
                    API_KEY,
                    encodedAddress
                }
            });
            res.json(resp);
        }
        catch (error) {
            return next(error);
        }
    });
});
exports.default = router;
