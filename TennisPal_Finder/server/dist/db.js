"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const config_1 = require("./config");
let db;
if (process.env.NODE_ENV === "production") {
    exports.db = db = new pg_1.Client({
        connectionString: (0, config_1.getDatabaseUri)(),
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
    exports.db = db = new pg_1.Client({
        connectionString: (0, config_1.getDatabaseUri)()
    });
}
db.connect();
