"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDatabaseSwitch = exports.tenanttoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
// Parse JWT token and handle database switch
async function handleDatabaseSwitch(token) {
    try {
        console.log("token+++++++++", token);
        // Decode the JWT token to extract tenant information
        const decodedToken = jsonwebtoken_1.default.decode(token.token);
        console.log("decodedToken+++++", decodedToken);
        const tenantName = decodedToken.tenant;
        console.log("Tenant Token:", tenantName);
        // Switch to the database with the same name as the tenant
        await (0, __1.startServer)(tenantName);
    }
    catch (error) {
        console.error("Error switching database:", error);
        return null;
    }
}
exports.handleDatabaseSwitch = handleDatabaseSwitch;
//# sourceMappingURL=utility.service.js.map