import {db} from '../db';

// handles methods that interact with the availabilities table
class Availabilities {

  // saves the availabilities for a specific user
  static async saveAvailabilities (user_id: number, availabilities: string[]) {
    
    const addedAvailabilities = [];
    for (let availability of availabilities) {
      const result = await db.query(`
        INSERT INTO user_availabilities
        (user_id, day_of_week)
        VALUES ($1, $2)
        RETURNING user_id AS "userId", day_of_week AS "dayOfWeek"`,
        [user_id, availability]
      );
      addedAvailabilities.push(result.rows[0]);
    }
    return addedAvailabilities;
  }

}

export default Availabilities;