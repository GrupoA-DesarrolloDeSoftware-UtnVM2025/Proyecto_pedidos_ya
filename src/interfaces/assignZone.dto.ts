import {IsNotEmpty, IsNumber} from "class-validator";

export class AssignZoneDto {
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    zoneIds: number[]
}