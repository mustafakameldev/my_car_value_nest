import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
//import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  //@Exclude()
  password: string;
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  // @AfterInsert()
  // logInsert() {}
  // @AfterUpdate()
  // logUpdate() {}
  // @AfterRemove()
  // logRemove() {}
}
