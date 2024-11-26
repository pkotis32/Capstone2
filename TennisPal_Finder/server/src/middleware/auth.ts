import express, { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");



// if a token is provided, verify it and if valid, store the payload (username) on res.locals
// if token is not value, username will not exist on res.locals
function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}


// middleware to make sure that the user is logged in
function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}



// middleware to use to make sure that the user logged in matches the user in the route params
function ensureCorrectUser(req: Request, res: Response, next: NextFunction) {

  try {
    const user = res.locals.user;

    if (!(user && (user.username === req.params.username))) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}


export {
    authenticateJWT, 
    ensureLoggedIn, 
    ensureCorrectUser
  }

