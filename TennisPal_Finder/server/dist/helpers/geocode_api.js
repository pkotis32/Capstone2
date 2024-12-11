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
const axios_1 = __importDefault(require("axios"));
const BASE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = 'AIzaSyBJH3OKaWYrm3RiNkabZCCfyfM9Z2m0PLk';
// determines the lat and lng of a given address
function getLatLng(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const encodedAddress = encodeURIComponent(address);
            const response = yield axios_1.default.get(`${BASE_API}?address=${encodedAddress}&key=${API_KEY}`);
            let data = response.data;
            const location = data.results[0].geometry.location;
            return location;
        }
        catch (error) {
            throw new Error("Failed to get court location");
        }
    });
}
exports.default = getLatLng;
