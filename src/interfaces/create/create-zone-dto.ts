import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, Matches, Min, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class LocationDto {
    @IsNumber()
    @IsNotEmpty({message: 'La latitud es obligatoria'})
    latitude: number;

    @IsNumber()
    @IsNotEmpty({message: 'La longitud es obligatoria'})
    longitude: number;
}

export class CreateZoneDto {
    @IsNotEmpty()
    name: string;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    @IsNotEmpty({message: 'Los datos de ubicación son obligatorios'})
    location: LocationDto;

    @IsNotEmpty({message: 'El radio es obligatorio'})
    @IsNumber({},{message: 'El radio debe ser un número'})
    @IsPositive({message: 'El radio debe ser un número positivo'})
    @Min(1, {message: 'El radio debe ser mayor a 0'})
    radius: number;

    @IsOptional()
    deliveryId?: number;
}