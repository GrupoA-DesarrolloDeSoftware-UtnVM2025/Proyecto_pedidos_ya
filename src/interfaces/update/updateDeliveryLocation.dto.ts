import {IsNotEmpty, IsObject, ValidateNested} from "class-validator";
import {LocationDto} from "../location.dto";
import {Type} from "class-transformer";

export class UpdateDeliveryLocationDto {
    @IsObject()
    @ValidateNested()
    @Type(()=> LocationDto)
    @IsNotEmpty({message: "Los datos de ubicación son obligatorios para acutalizarlos"})
    location: LocationDto;
}