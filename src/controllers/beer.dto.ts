import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBeerDto {
    @ApiProperty({ required: true })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsString()
    type: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    rating: number;
}

export class UpdateBeerDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    type: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    rating: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    totalRatings: number;
}
