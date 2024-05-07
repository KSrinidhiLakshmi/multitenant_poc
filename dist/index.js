"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.startServer = exports.dbName = void 0;
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const Port = 4000;
var http = require("http").Server(app_1.default);
exports.dbName = "tenant_2";
let sequelize;
exports.sequelize = sequelize;
async function startServer(dbName) {
    console.log("dbName", dbName);
    // Connect to the database with the dynamic database name
    exports.sequelize = sequelize = await (0, db_1.connectToDatabase)(dbName);
    // Check if the database connection was successful
    if (!sequelize) {
        console.error("Failed to connect to the database. Exiting...");
        process.exit(1);
    }
    // Start your server or perform any other operations once the database is connected
    console.log("Database connected successfully. Starting server...");
    // Your server startup code here
}
exports.startServer = startServer;
// Call the function to start the server
startServer(exports.dbName);
const port = process.env.PORT || Port;
http.listen(port, () => {
    return console.log(`Server is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map