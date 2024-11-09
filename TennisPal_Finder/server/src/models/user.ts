
import db from ('../db');
import bcrypt from 'bcrypt';
import {NotFoundError, BadRequestError, UnauthorizedError} from '../expressError';
import { BCRYPT_WORK_FACTOR } from '../config';

class User {

    // authenticate user with username and password
    // returns user info {username, first_name, last_name, email}
    // throws unauthorized error if user is not found or wrong password
}
