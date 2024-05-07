import { body, check, header, param } from "express-validator";

export const validateTablePayload = [
  body("data.Tank").isString(),
  body("data.TankShape").isString(),
  body("data.Asset").isString(),
  body("data.Organization").isString(),
  body("token").isJWT(),
];

export const validateAuthHeader = [
  header("Authorization", "Authorization key is required")
    .trim()
    .exists()
    .notEmpty(),
];
