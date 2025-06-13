import {IsNotEmpty, IsNumber, Max, Min} from "class-validator";

export class LocationDto {
    @IsNumber()
    @Min(-90)
    @Max(90)
    @IsNotEmpty({message: 'latitude is mandatory'})
    latitude: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    @IsNotEmpty({message: 'longitude is mandatory'})
    longitude: number;
}