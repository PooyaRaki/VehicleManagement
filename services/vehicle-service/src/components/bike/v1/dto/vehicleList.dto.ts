import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsOptional } from "class-validator";

export class VehicleListDto {
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === '1')
    public readonly available?: boolean;

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => ~~value)
    public readonly distance?: number;
}