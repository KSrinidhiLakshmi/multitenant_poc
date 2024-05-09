import { connect } from "http2";
import { Dialect, Sequelize } from "sequelize";

const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;
let sequelize: Sequelize;

export async function connectToDatabase(dbName: string): Promise<Sequelize> {
  console.log("dbName+++++insideconnectToDatabase", dbName);
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
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
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

export { sequelize };
