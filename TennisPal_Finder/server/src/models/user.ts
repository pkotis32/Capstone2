
import db from ('../db');
import bcrypt from 'bcrypt';
import {NotFoundError, BadRequestError, UnauthorizedError} from '../expressError';
import { BCRYPT_WORK_FACTOR } from '../config';

class User {

    // authenticate user with username and password
    // returns user info {username, first_name, last_name, email, skillLevel}
    // throws unauthorized error if user is not found or wrong password
    static async authenticate(username: string, password: string) {

        const result = await db.query(
            `SELECT username
                    password
                    first_name as firstName
                    last_name as lastName
                    email
                    skill_level as skillLevel
            FROM users
            WHERE username = $1`, 
            [username]
        );

        const user = result.rows[0];

        if (user) {
            // compare the hashed password to the one that was enterred
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        // throw error if user was not found in the database
        throw new UnauthorizedError("Invalid username/password");
    }



    // register new user
    // returns user info {username, first_name, last_name, email, skillLevel}
    // throws bad request error if a duplicate user was found
    static async register(username: string, password: string, firstName: string, lastName: string, email: string, skillLevel: string) {
        
        const duplicateCheck = await db.query(
            `SELECT username 
            FROM users
            WHERE username = $1`,
            [username]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users 
            (username, password, first_name, last_name, email, skill_level)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING username, first_name as firstName, last_name as lastName, email, skill_level as skillLevel`,
            [username, hashedPassword, firstName, lastName, email, skillLevel]
        );

        const user = result.rows[0];
        return user;
    }
}
