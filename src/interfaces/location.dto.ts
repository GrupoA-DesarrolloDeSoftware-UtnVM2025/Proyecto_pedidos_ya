import {IsNotEmpty, IsNumber} from "class-validator";

export class LocationDto {
    @IsNumber()
    @IsNotEmpty({message: 'La latitud es obligatoria'})
    latitude: number;

    @IsNumber()
    @IsNotEmpty({message: 'La longitud es obligatoria'})
    longitude: number;
}