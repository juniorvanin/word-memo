import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Word } from './../../words/entities/word.entity';

@Entity('user_word', {
  schema: 'public',
})
@Unique(['userId', 'wordId'])
export class UserWord {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  public id!: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user!: User;

  @ManyToOne(() => Word, (word) => word.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'wordId' })
  public word!: Word;

  @Column('uuid', {
    name: 'userId',
  })
  public userId!: string;

  @Column('uuid', {
    name: 'wordId',
  })
  public wordId!: string;
}
