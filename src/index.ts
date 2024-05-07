import app from "./app";
import { connectToDatabase } from "./config/db";
import { Sequelize } from "sequelize";

import { tenanttoken } from "./services/utility.service";
import { DefaultDeserializer } from "v8";
const Port = 4000;
var http = require("http").Server(app);

export let dbName = "tenant_2";
let sequelize;

export async function startServer(dbName) {
  console.log("dbName", dbName);
  // Connect to the database with the dynamic database name
  sequelize = await connectToDatabase(dbName);

  // Check if the database connection was successful
  if (!sequelize) {
    console.error("Failed to connect to the database. Exiting...");
    process.exit(1);
  }

  // Start your server or perform any other operations once the database is connected
  console.log("Database connected successfully. Starting server...");
  // Your server startup code here
}

// Call the function to start the server
startServer(dbName);
export { sequelize };

const port = process.env.PORT || Port;
http.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
