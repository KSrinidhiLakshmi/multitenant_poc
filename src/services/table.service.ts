import { Op, where, Model, col } from "sequelize";
import { defineTable } from "../models/table.model";
import { validateTablePayload } from "../middleware/validation.middleware";
import { sequelize } from "../config/db";
import { handleDatabaseSwitch } from "./utility.service";

interface Payload {
  Asset: string;
  Tank: string;
  TankShape: string;
  Organization: string;
  Token: string;
  // Define other properties here
}

export const fetchTableData = async () => {
  const Table = await defineTable();
  const tableData = await Table.findAll({
    order: [["Id", "ASC"]],
  });
  const result = JSON.parse(JSON.stringify(tableData));

  return result;
};

// fetch table data w.r.t tenent

export const fetchTableDataTenantWise = async (token) => {
  const getData = await handleDatabaseSwitch(token);
  const Table = await defineTable();
  const tableData = await Table.findAll({
    order: [["Id", "ASC"]],
  });
  const result = JSON.parse(JSON.stringify(tableData));
  return result;
};

export const createTableData = async (payload) => {
  let transaction: any;
  try {
    transaction = await sequelize.transaction();

    // const getTenant = payload.Token;
    const getData = await handleDatabaseSwitch(payload);

    const Table = await defineTable();

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

    const result: any = await Table.create({
      Asset: payload.data.Asset,
      Tank: payload.data.Tank,
      TankShape: payload.data.TankShape,
      Organization: payload.data.Organization,
    });

    console.log("result+++++++++++", result);

    await transaction.commit();
    return { Success: true };
  } catch (e) {
    console.log("eeeeeeeee+++++", e);
    if (transaction) {
      await transaction.rollback();
    }
    throw e;
  }
};
