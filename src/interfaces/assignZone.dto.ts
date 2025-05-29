import {IsArray, IsNotEmpty, IsNumber} from "class-validator";

export class AssignZoneDto {
    @IsNumber({}, { each: true })
    @IsArray()
    @IsNotEmpty()
    zoneIds: number[]
}