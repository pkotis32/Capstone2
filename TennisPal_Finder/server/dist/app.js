"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expressError_1 = require("./expressError");
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const google_api_1 = __importDefault(require("./routes/google_api"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Enable CORS for all routes
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.use('/users', users_1.default);
app.use('/api', google_api_1.default);
app.get("/", (req, res) => {
    res.json("Hello from Express!");
});
/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
    return next(new expressError_1.NotFoundError());
});
/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== "test")
        console.error(err.stack);
    const status = err.status || 500;
    const message = err.error;
    res.status(status).json({
        error: { message, status },
    });
});
exports.default = app;
