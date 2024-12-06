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
            const result = yield db_1.db.query(`
      INSERT INTO messages
      (sender_id, receiver_id, message_text)
      VALUES ($1, $2, $3)
      RETURNING sender_id AS "senderId", receiver_id AS "receiverId", message_text AS message`, [senderId, receiverId, message]);
            return result.rows[0];
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
    // get all users that a user has a chat with
    static getUserChats(currUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`
      SELECT DISTINCT u.username
      FROM users u
      JOIN messages m ON u.user_id = (
          CASE
              WHEN m.sender_id = $1 THEN m.receiver_id
              ELSE m.sender_id
          END
      )
      WHERE $1 IN (m.sender_id, m.receiver_id)`, [currUserId]);
            return result.rows;
        });
    }
}
exports.default = Messages;
