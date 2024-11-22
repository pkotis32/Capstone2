import jsonschema from 'jsonschema';
import {createToken} from '../helpers/tokens';
import Users from '../models/users';
import express from 'express';
const router = express.Router();
import userAuthSchema from '../schemas/userAuth.json';
import userRegisterSchema from '../schemas/userRegister.json';
import { BadRequestError } from '../expressError';


// POST /auth/token  {username, password} => {token}
// returns the JWT which can be used to authenticate further requests
// authorization: none

router.post('/token', async function (req, res, next) {
    try {  

        interface UserInfo {
            username: string,
            firstName: string,
            lastName: string,
            email: string, 
            skillLevel: string
        }

        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const {username, password}: {username: string, password: string}= req.body;
        const user: UserInfo = await Users.authenticate(username, password);
        const token: string = createToken(user);
        res.json({token});
    } catch (error) {
        return next(error);
    }
})


// POST /auth/register  {username, password, firstName, lastName, email, skillLevel} => {token}
// returns the JWT to authenticate further requests
// authorization: none

router.post('/register', async function (req, res, next) {
    
    interface User {
        username: string,
        firstName: string,
        lastName: string,
        email: string, 
        skillLevel: string
    }

    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        
        const newUser: User = await Users.register({...req.body});
        const token = createToken(newUser);
        res.status(201).json({token});
    } catch (error) {
        return next(error);
    }
})



export default router


