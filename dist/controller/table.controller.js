"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableController = void 0;
const { validationResult } = require("express-validator");
const base_controller_1 = require("./base.controller");
// import { dbName } from "..";
const table_service_1 = require("../services/table.service");
//  import { parseJwt } from "../services/utility.service";
class tableController extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    async getTableData(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            let response = await (0, table_service_1.fetchTableData)();
            this.jsonRes(response, res);
        }
        catch (e) {
            this.errRes(e, res, "unexpected error occurred", 400);
        }
    }
    async createTableData(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            const requestbody = req.body;
            console.log("req.body", requestbody);
            // const payload: any = {
            //   Asset: requestbody.data.Asset,
            //   Tank: requestbody.data.Tank,
            //   TankShape: requestbody.data.TankShape,
            //   Organization: requestbody.data.Organization,
            // };
            let response = await (0, table_service_1.createTableData)(requestbody);
            this.jsonRes(response, res);
        }
        catch (e) {
            this.errRes(e, res, "unexpected error occurred", 400);
        }
    }
    //get tenant data
    async getTenantData(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            const response = await (0, table_service_1.fetchTableDataTenantWise)(req.body);
            this.jsonRes(response, res);
        }
        catch (e) {
            this.errRes(e, res, "unexpected error occurred", 400);
        }
    }
}
exports.tableController = tableController;
//# sourceMappingURL=table.controller.js.map