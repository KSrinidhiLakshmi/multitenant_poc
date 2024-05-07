"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthHeader = exports.validateTablePayload = void 0;
const express_validator_1 = require("express-validator");
exports.validateTablePayload = [
    (0, express_validator_1.body)("data.Tank").isString(),
    (0, express_validator_1.body)("data.TankShape").isString(),
    (0, express_validator_1.body)("data.Asset").isString(),
    (0, express_validator_1.body)("data.Organization").isString(),
    (0, express_validator_1.body)("token").isJWT(),
];
exports.validateAuthHeader = [
    (0, express_validator_1.header)("Authorization", "Authorization key is required")
        .trim()
        .exists()
        .notEmpty(),
];
//# sourceMappingURL=validation.middleware.js.map