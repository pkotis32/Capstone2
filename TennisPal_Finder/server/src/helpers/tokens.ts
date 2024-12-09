import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config';

interface User {
    username: string,
    firstName: string,
    lastName: string,
    email: string, 
    skillLevel: string
}


// create jwt for a user with the username as the payload
function createToken (user: User): string {

    let payload: {username: string} = {
        username: user.username
    }

    return jwt.sign(payload, SECRET_KEY);
}

export {createToken};
