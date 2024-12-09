import {db} from '../db';

// handles methods that interact with the court locations table
class Court_locations {

  // saves a users court address
  static async saveCourtAddress(userId: number, courtName: string, courtAddress: string, latitude: number, longitude: number) {
    const result = await db.query(`
        INSERT INTO court_locations
        (user_id, court_name, court_address, court_latitude, court_longitude)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING user_id AS "userId", court_name AS "courtName", court_latitude AS "courtLatitude", court_longitude AS "courtLongitude"`,
        [userId, courtName, courtAddress, latitude, longitude]
    )
    return result.rows[0]
  };

  
  // gets all the court locations saved 
  static async getCourtLocations() {
    const result = await db.query(`
      SELECT court_name,
             court_latitude,
             court_longitude
      FROM court_locations
    `)
    
    return result.rows;

  }

}

export default Court_locations;