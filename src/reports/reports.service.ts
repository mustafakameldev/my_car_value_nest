import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }

  findAll(make: string) {
    return this.repo.findBy({ make });
  }
  findById(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async changeApproval(id: string, approved: boolean) {
    const newId: number = parseInt(id);
    const report = await this.repo.findOneBy({ id: newId });
    if (!report) {
      throw new NotFoundException('report not found ');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
