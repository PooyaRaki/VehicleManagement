import { IsString } from "class-validator";

export class FetchVehicleDto {
  @IsString()
  public readonly id: string;
}
