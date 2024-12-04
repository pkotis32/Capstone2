import {db} from '../db';

// handles methods that interact with the court locations table
class Court_locations {

  static async saveCourtAddress(userId: number, courtName: string, courtAddress: string, latitude: number, longitude: number) {
    const result = await db.query(`
        INSERT INTO court_locations
        (user_id, court_name, court_address, court_latitude, court_longitude)
        VALUES ($1, $2, $3, $4, $5)`,
        [userId, courtName, courtAddress, latitude, longitude]
    )
  };

  
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