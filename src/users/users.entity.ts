import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
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
  @AfterInsert()
  logInsert() {
    console.log('inserted user with ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('User removed with user id', this.id);
  }
}
