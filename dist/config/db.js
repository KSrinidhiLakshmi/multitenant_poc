"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.connectToDatabase = void 0;
const sequelize_1 = require("sequelize");
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER;
const dbPassword = process.env.DB_PASSWORD;
let sequelize;
exports.sequelize = sequelize;
async function connectToDatabase(dbName) {
    console.log("dbName+++++insideconnectToDatabase", dbName);
    exports.sequelize = sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
        dialect: dbDriver,
        host: dbHost,
        protocol: "tcp",
        ssl: false,
        pool: { min: 0, max: 20, idle: 10000 },
        dialectOptions: {
            encrypt: true,
            options: {
                requestTimeout: 30000,
            },
        },
        define: { timestamps: false },
        logging: process.env.NODE_ENV === "production" ? false : console.log,
    });
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        return sequelize;
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.js.map