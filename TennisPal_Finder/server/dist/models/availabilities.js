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
// handles methods that interact with the availabilities table
class Availabilities {
    static saveAvailabilities(user_id, availabilities) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let availability of availabilities) {
                const result = yield db_1.db.query(`
        INSERT INTO user_availabilities
        (user_id, day_of_week)
        VALUES ($1, $2)`, [user_id, availability]);
            }
        });
    }
}
exports.default = Availabilities;
