import { ValidatorOptions } from "class-validator";

export const ValidatorConfig: ValidatorOptions = {
    whitelist: true,
    stopAtFirstError: true,
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
  }
  