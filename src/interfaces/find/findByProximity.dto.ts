import {IsNotEmpty, IsNumber, IsObject, IsPositive, Min, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {LocationDto} from "../location.dto";

export class FindByProximityDto {
    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    @IsNotEmpty({ message: "Los datos de ubicación son obligatorios" })
    location: LocationDto

    @IsNumber()
    @IsPositive({ message: "El radio debe ser un número positivo" })
    @Min(1, { message: "El radio debe ser mayor a 0" })
    @IsNotEmpty({ message: "El radio es obligatorio" })
    radius: number
}