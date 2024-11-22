import {db} from '../db';

// handles methods that interact with the court locations table
class court_locations {

  static async save_address(userId: number, court_name: string, address: string, latitude: number, longitude: number) {

    const result = await db.query(`
      INSERT INTO court_locations
      (user_id, court_name, address, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id AS "userId", court_name AS "courtName", address, latitude, longitude`,
      [userId, court_name, address, latitude, longitude]
    );

    const location = result.rows[0];

    return location
  }

}

export default court_locations;