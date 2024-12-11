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
    // saves the availabilities for a specific user
    static saveAvailabilities(user_id, availabilities) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedAvailabilities = [];
            for (let availability of availabilities) {
                const result = yield db_1.db.query(`
        INSERT INTO user_availabilities
        (user_id, day_of_week)
        VALUES ($1, $2)
        RETURNING user_id AS "userId", day_of_week AS "dayOfWeek"`, [user_id, availability]);
                addedAvailabilities.push(result.rows[0]);
            }
            return addedAvailabilities;
        });
    }
}
exports.default = Availabilities;
