import { CoreEntity } from './../../common/entities/core.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Role extends CoreEntity {
    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    slug: string;
}