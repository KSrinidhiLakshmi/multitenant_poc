import express, { Request, Response } from "express";
const router = express.Router();
import { tableController } from "../controller/table.controller";
import {
  validateTablePayload,
  validateAuthHeader,
} from "../middleware/validation.middleware";
const Table = new tableController();

router.get("/fetch", (req: Request, res: Response) => {
  Table.getTableData(req, res);
});

router.post("/create", validateTablePayload, (req: Request, res: Response) => {
  Table.createTableData(req, res);
});

router.post("/gettenant", (req: Request, res: Response) => {
  Table.getTenantData(req, res);
});

export { router };
