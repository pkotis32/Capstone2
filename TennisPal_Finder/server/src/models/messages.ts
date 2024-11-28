import {db} from '../db';

// handles methods that interact with the messages table
class Messages {


  // saves sent message in the database
  static async sendMessage(senderId: number, receiverId: number, message: string) {

    const result = db.query(`
      INSERT INTO messages
      (sender_id, receiver_id, message_text)
      VALUES ($1, $2, $3)`,
      [senderId, receiverId, message]
    );
  }

  // retrieves all messages associated with two users
  static async getMessages(user1Id: number, user2Id: number) {

    const result = await db.query(`
      SELECT message_id AS "messageId",
             sender_id AS "senderId",
             receiver_id AS "receiverId",
             message_text AS "messageText",
             sent_at AS "sentAt"  
      FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY sent_at`,
      [user1Id, user2Id]
    );

    return result.rows;
  }
}




export default Messages