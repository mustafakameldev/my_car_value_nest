import { IsString } from 'class-validator';

export class SearchReportDto {
  @IsString()
  make: string;
}
