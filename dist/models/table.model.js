"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTable = void 0;
const index_1 = require("../index");
const sequelize_1 = require("sequelize");
// Ensure sequelize is properly imported from '../index'
// Define your model using sequelize.define
async function defineTable() {
    const Table = index_1.sequelize.define("Table", {
        Id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        Asset: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        Tank: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        TankShape: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        Organization: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    }, { tableName: "table" });
    // Ensure that the Table model is synchronized with the database schema
    await Table.sync();
    console.log("Table+++++++++", Table);
    return Table;
}
exports.defineTable = defineTable;
//# sourceMappingURL=table.model.js.map