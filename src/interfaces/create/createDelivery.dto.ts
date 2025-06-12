import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, Matches, Min, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {LocationDto} from "../location.dto";



export class CreateDeliveryDto {
    @IsNumber()
    @IsNotEmpty({message: "El id del repartidor debe colocarse"})
    perosonId: number;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    @IsNotEmpty({message: 'Los datos de ubicación son obligatorios'})
    location: LocationDto;

    @IsNotEmpty({message: 'El radio es obligatorio'})
    @IsNumber({},{message: 'El radio debe ser un número'})
    @IsPositive({message: 'El radio debe ser un número positivo'})
    @Min(0.1, {message: 'El radio debe ser mayor a 0'})
    radius: number;
}