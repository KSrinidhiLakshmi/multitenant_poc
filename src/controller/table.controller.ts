import { Request, Response } from "express";
const { validationResult } = require("express-validator");
import { BaseController } from "./base.controller";
// import { dbName } from "..";

import {
  fetchTableData,
  createTableData,
  fetchTableDataTenantWise,
} from "../services/table.service";
//  import { parseJwt } from "../services/utility.service";

export class tableController extends BaseController {
  constructor() {
    super();
  }
  async getTableData(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      let response = await fetchTableData();
      this.jsonRes(response, res);
    } catch (e) {
      this.errRes(e, res, "unexpected error occurred", 400);
    }
  }

  async createTableData(req: Request, res: Response) {
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

      let response: any = await createTableData(requestbody);
      this.jsonRes(response, res);
    } catch (e) {
      this.errRes(e, res, "unexpected error occurred", 400);
    }
  }

  //get tenant data

  async getTenantData(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const response = await fetchTableDataTenantWise(req.body);

      this.jsonRes(response, res);
    } catch (e) {
      this.errRes(e, res, "unexpected error occurred", 400);
    }
  }
}
