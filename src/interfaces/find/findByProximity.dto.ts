import {IsNotEmpty, IsNumber, IsObject, IsPositive, Min, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {LocationDto} from "../location.dto";

export class FindByProximityDto {
    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    @IsNotEmpty({ message: "location data is mandatory" })
    location: LocationDto

    @IsNumber({},{ message: "radius must be a number"})
    @IsPositive({ message: "radius must be a positive number" })
    @Min(0.1, { message: "radius must be greater than 0" })
    @IsNotEmpty({ message: "radius is mandatory" })
    radius: number
}