"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
exports.ensureLoggedIn = ensureLoggedIn;
exports.ensureCorrectUser = ensureCorrectUser;
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
const expressError_1 = require("../expressError");
// if a token is provided, verify it and if valid, store the payload (username) on res.locals
// if token is not value, username will not exist on res.locals
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, config_1.SECRET_KEY);
        }
        return next();
    }
    catch (err) {
        return next();
    }
}
// middleware to make sure that the user is logged in
function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user)
            throw new expressError_1.UnauthorizedError();
        return next();
    }
    catch (err) {
        return next(err);
    }
}
// middleware to use to make sure that the user logged in matches the user in the route params
function ensureCorrectUser(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && (user.username === req.params.username))) {
            throw new expressError_1.UnauthorizedError();
        }
        return next();
    }
    catch (err) {
        return next(err);
    }
}
