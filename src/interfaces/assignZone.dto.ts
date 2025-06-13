import {IsArray, IsNotEmpty, IsNumber} from "class-validator";

export class AssignZoneDto {
    @IsNumber({}, { each: true })
    @IsArray({message: 'zoneIds must be an array'})
    @IsNotEmpty({message: 'at least one zoneIds is mandatory'})
    zoneIds: number[]
}