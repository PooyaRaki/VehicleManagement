import { validateOrReject } from "class-validator";
import { ValidatorConfig } from "@utils/config";
import { BadRequestException } from "@app/exceptions";
import { ClassConstructor, plainToClass } from "class-transformer";

export const Validator = async <T extends object>(
  dto: ClassConstructor<T>,
  data: any
): Promise<T> => {
  try {
    const params = plainToClass(dto, data);

    await validateOrReject(params, ValidatorConfig);

    return params;
  } catch (error) {
    throw new BadRequestException("VALIDATION_FAILED", error);
  }
};
