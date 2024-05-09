import jwt from "jsonwebtoken";
import { startServer } from "..";
import { fetchTableData } from "./table.service";

export let tenanttoken;

// Parse JWT token and handle database switch
export async function handleDatabaseSwitch(token: any) {
  try {
    console.log("token+++++++++", token);
    // Decode the JWT token to extract tenant information
    const decodedToken: any = jwt.decode(token.token);

    console.log("decodedToken+++++", decodedToken);
    const tenantName = decodedToken.tenant;

    console.log("Tenant Token:", tenantName);

    // Switch to the database with the same name as the tenant
    await startServer(tenantName);
  } catch (error) {
    console.error("Error switching database:", error);
    return null;
  }
}
