import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, Min, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {LocationDto} from "../location.dto";

export class PatchZoneDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsObject()
    @ValidateNested()
    @Type(()=> LocationDto)
    @IsOptional()
    location?: LocationDto;

    @IsNumber()
    @IsPositive({ message: "radius must be a positive number" })
    @Min(1, { message: "radius must be greater than 0" })
    @IsOptional()
    radius?: number

}