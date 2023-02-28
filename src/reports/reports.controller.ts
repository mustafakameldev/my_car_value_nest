import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guards';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { SearchReportDto } from './dtos/search-report.dto';
@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Post()
  @Serialize(ReportDto)
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }
  @Post('/search')
  getReports(@Body() body: SearchReportDto) {
    return this.reportService.findAll(body.make);
  }
  @Get('/:id')
  getSingle(@Param('id') id: string) {
    return this.reportService.findById(parseInt(id));
  }
}
