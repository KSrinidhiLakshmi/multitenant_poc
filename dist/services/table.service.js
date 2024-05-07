"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableData = exports.fetchTableDataTenantWise = exports.fetchTableData = void 0;
const table_model_1 = require("../models/table.model");
const db_1 = require("../config/db");
const utility_service_1 = require("./utility.service");
const fetchTableData = async () => {
    const Table = await (0, table_model_1.defineTable)();
    const tableData = await Table.findAll({
        order: [["Id", "ASC"]],
    });
    const result = JSON.parse(JSON.stringify(tableData));
    return result;
};
exports.fetchTableData = fetchTableData;
// fetch table data w.r.t tenent
const fetchTableDataTenantWise = async (token) => {
    const getData = await (0, utility_service_1.handleDatabaseSwitch)(token);
    const Table = await (0, table_model_1.defineTable)();
    const tableData = await Table.findAll({
        order: [["Id", "ASC"]],
    });
    const result = JSON.parse(JSON.stringify(tableData));
    return result;
};
exports.fetchTableDataTenantWise = fetchTableDataTenantWise;
const createTableData = async (payload) => {
    let transaction;
    try {
        transaction = await db_1.sequelize.transaction();
        // const getTenant = payload.Token;
        const getData = await (0, utility_service_1.handleDatabaseSwitch)(payload);
        const Table = await (0, table_model_1.defineTable)();
        console.log("payload", payload.data.Asset);
        const check = await Table.findOne({
            where: {
                Asset: payload.data.Asset,
            },
        });
        console.log("check+++++++", check);
        if (check) {
            throw "Asset exists";
        }
        const result = await Table.create({
            Asset: payload.data.Asset,
            Tank: payload.data.Tank,
            TankShape: payload.data.TankShape,
            Organization: payload.data.Organization,
        });
        console.log("result+++++++++++", result);
        await transaction.commit();
        return { Success: true };
    }
    catch (e) {
        console.log("eeeeeeeee+++++", e);
        if (transaction) {
            await transaction.rollback();
        }
        throw e;
    }
};
exports.createTableData = createTableData;
//# sourceMappingURL=table.service.js.map