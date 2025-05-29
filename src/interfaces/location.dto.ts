import {IsNotEmpty, IsNumber, Max, Min} from "class-validator";

export class LocationDto {
    @IsNumber()
    @Min(-90)
    @Max(90)
    @IsNotEmpty({message: 'La latitud es obligatoria'})
    latitude: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    @IsNotEmpty({message: 'La longitud es obligatoria'})
    longitude: number;
}