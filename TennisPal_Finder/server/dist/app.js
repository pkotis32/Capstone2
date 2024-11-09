"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { NotFoundError } = require('./expressError');
const app = (0, express_1.default)();
const cors = require("cors");
const corOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corOptions));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json("Hello from Express!");
});
/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
    return next(new NotFoundError());
});
/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== "test")
        console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error: { message, status },
    });
});
module.exports = app;
