import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config';

interface User {
    username: string,
    firstName: string,
    lastName: string,
    email: string, 
    skillLevel: string
}

function createToken (user: User): string {

    let payload: {username: string} = {
        username: user.username
    }

    return jwt.sign(payload, SECRET_KEY);
}

export {createToken};
