import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, Matches, Min, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {LocationDto} from "../location.dto";

export class CreateZoneDto {
    @IsNotEmpty()
    name: string;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    @IsNotEmpty({message: 'location data is mandatory'})
    location: LocationDto;

    @IsNotEmpty({message: 'radius is mandatory'})
    @IsNumber({},{message: 'radius must be a number'})
    @IsPositive({message: 'radius must be a positive number'})
    @Min(0.1, {message: 'radius must be greater than 0'})
    radius: number;
}