import { BaseEntity } from 'src/common/entities/base.entity';
import { Gender } from 'src/modules/user/enums/gender.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  profileImage: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;
}
