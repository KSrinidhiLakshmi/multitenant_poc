import { sequelize } from "../index";
import { DataTypes } from "sequelize";

// Ensure sequelize is properly imported from '../index'

// Define your model using sequelize.define
export async function defineTable() {
  const Table = sequelize.define(
    "Table",
    {
      Id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Asset: { type: DataTypes.STRING, allowNull: false },
      Tank: { type: DataTypes.STRING, allowNull: false },
      TankShape: { type: DataTypes.STRING, allowNull: false },
      Organization: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: "table" }
  );
  // Ensure that the Table model is synchronized with the database schema
  await Table.sync();

  console.log("Table+++++++++", Table);

  return Table;
}
