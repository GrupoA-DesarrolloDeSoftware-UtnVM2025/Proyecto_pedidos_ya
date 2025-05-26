import { IsNotEmpty, IsNumber, IsPositive, Matches, Min } from "class-validator";

export class CreateDeliveryDto {
    @IsNotEmpty()
    perosonId: number;

    @IsNotEmpty({message: 'Los datos de ubicación son obligatorios'})
    location: {latitude: number; longitude: number};

    @IsNotEmpty({message: 'El radio es obligatorio'})
    @IsNumber({},{message: 'El radio debe ser un número'})
    @IsPositive({message: 'El radio debe ser un número positivo'})
    @Min(1, {message: 'El radio debe ser mayor a 0'})
    radius: number;

    @IsNotEmpty({message: 'El estado es obligatorio'})
    status: string;
    
    personId: number;
}