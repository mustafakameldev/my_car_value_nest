import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
export class GetEstimateDto {
  @PrimaryGeneratedColumn()
  id: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
  @IsString()
  make: string;
  @IsString()
  model: string;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;
  @Transform(({ value }) => parseInt(value))
  @IsLongitude()
  lng: number;
  @Transform(({ value }) => parseInt(value))
  @IsLatitude()
  lat: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
