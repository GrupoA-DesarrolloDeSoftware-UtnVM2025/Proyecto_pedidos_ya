import {IsNotEmpty, IsNumber} from "class-validator";

export class FindByZoneDto {
    @IsNumber({},{message: 'zoneId must be a number'})
    @IsNotEmpty({message: 'zoneId is mandatory'})
    zoneId: number
}