import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('word', {
  schema: 'public',
})
export class Word {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  public id!: string;

  @Column('character varying', {
    name: 'article',
  })
  public article!: string;

  @Column('character varying', {
    name: 'word',
  })
  public word!: string;

  @Column('character varying', {
    name: 'syllables',
  })
  public syllables!: string;

  @Column('character varying', {
    name: 'example',
  })
  public example!: string;

  @Column('character varying', {
    name: 'translation',
  })
  public translation!: string;

  @Column('character varying', {
    name: 'type',
  })
  public type!: string;
}
