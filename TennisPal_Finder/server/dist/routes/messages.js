"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_1 = __importDefault(require("../models/users"));
const messages_1 = __importDefault(require("../models/messages"));
const auth_1 = require("../middleware/auth");
// POST /messages  {message} => () 
// saves message in database, message object passed in contains {sender, receiver, message}
// authorization required: correct user logged in
router.post('/:username', auth_1.ensureCorrectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username: sender } = req.params;
    const { receiver, message } = req.body;
    try {
        // get the sender and receiver Id's for the next query
        let senderId;
        let receiverId;
        const response1 = yield users_1.default.get(sender);
        senderId = response1[0].userId;
        const response2 = yield users_1.default.get(receiver);
        receiverId = response2[0].userId;
        yield messages_1.default.sendMessage(senderId, receiverId, message);
        res.json({ message: "message sent" });
    }
    catch (error) {
        return next(error);
    }
}));
exports.default = router;
