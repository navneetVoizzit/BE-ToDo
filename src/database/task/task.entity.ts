import { BaseEntity } from 'src/common/entities/base.entity';
import { TaskPriority, TaskStatus } from 'src/modules/task/enums';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/database/user/user.entity';

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: UserEntity;
}
