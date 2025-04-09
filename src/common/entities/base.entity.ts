import { UserEntity } from 'src/database/user/user.entity';
import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  public static userId: string;

  static setUserId(userId: string) {
    this.userId = userId;
  }

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UserEntity, { nullable: true })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  updatedBy: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  deletedBy: UserEntity;
}
