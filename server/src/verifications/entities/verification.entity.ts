import { CoreEntity } from '../../common/entities/core.entity';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Verification extends CoreEntity {
  @Column()
  activation_link: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
