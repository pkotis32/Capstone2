import {db} from '../db';


class Availabilities {

  static async saveAvailabilities (user_id: number, availabilities: string[]) {
    
    for (let availability of availabilities) {
      const result = await db.query(`
        INSERT INTO user_availabilities
        (user_id, day_of_week)
        VALUES ($1, $2)`,
        [user_id, availability]
      );
    }
  
  }
}

export default Availabilities;