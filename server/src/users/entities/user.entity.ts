import { Role } from './../../roles/entities/role.entity';
import { Product } from './../../products/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends CoreEntity {
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @ApiProperty()
  @Length(6)
  password: string;

  // @Column({ type: 'enum', enum: Role, default: Role.Client, nullable: true })
  // roles: Role;

  @Column({ type: Boolean, default: false })
  email_verified: boolean;

  @ManyToMany((type) => Role, { eager: true })
  @JoinTable({ name: 'user_role' })
  roles: Role[];

  excludePassword() {
    delete this.password;
    return this;
  }
  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    console.log('hash password works...');
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
    }
  }
  async checkPasswords(password) {
    return await bcrypt.compare(password, this.password);
  }
}
