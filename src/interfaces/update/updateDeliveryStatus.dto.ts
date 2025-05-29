import {IsNotEmpty, IsString} from "class-validator";

export class UpdateDeliveryStatusDto {
    @IsString()
    @IsNotEmpty({message: "El estado es obligatorio para actualizarlo"})
    status: string;
}