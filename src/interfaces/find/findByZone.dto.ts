import {IsNotEmpty, IsNumber} from "class-validator";

export class FindByZoneDto {
    @IsNumber()
    @IsNotEmpty()
    zoneId: number
}