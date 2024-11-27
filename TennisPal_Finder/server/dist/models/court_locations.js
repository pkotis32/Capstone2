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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
// handles methods that interact with the court locations table
class Court_locations {
    static saveCourtAddress(userId, courtName, courtAddress, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`
        INSERT INTO court_locations
        (user_id, court_name, court_address, court_latitude, court_longitude)
        VALUES ($1, $2, $3, $4, $5)`, [userId, courtName, courtAddress, latitude, longitude]);
        });
    }
    ;
}
exports.default = Court_locations;
