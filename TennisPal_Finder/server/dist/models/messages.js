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
// handles methods that interact with the messages table
class Messages {
    // saves sent message in the database
    static sendMessage(senderId, receiverId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = db_1.db.query(`
      INSERT INTO messages
      (sender_id, receiver_id, message_text)
      VALUES ($1, $2, $3)`, [senderId, receiverId, message]);
        });
    }
    // retrieves all messages associated with two users
    static getMessages(user1Id, user2Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`
      SELECT message_id AS "messageId",
             sender_id AS "senderId",
             receiver_id AS "receiverId",
             message_text AS "messageText",
             sent_at AS "sentAt"  
      FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY sent_at`, [user1Id, user2Id]);
            return result.rows;
        });
    }
}
exports.default = Messages;
