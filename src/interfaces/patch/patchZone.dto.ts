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
    @IsPositive({ message: "El radio debe ser un número positivo" })
    @Min(1, { message: "El radio debe ser mayor a 0" })
    @IsOptional()
    radius?: number

}