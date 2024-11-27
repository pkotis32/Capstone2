import {db} from '../db';

// handles methods that interact with the messages table
class Messages {

  static async sendMessage(senderId: number, receiverId: number, message: string) {

    const result = db.query(`
      INSERT INTO messages
      (sender_id, receiver_id, message_text)
      VALUES ($1, $2, $3)`,
      [senderId, receiverId, message]
    );
  }
}

export default Messages