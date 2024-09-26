import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', {
  schema: 'public',
})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  public id!: string;

  @Column('character varying', {
    name: 'name',
  })
  public name!: string;

  @Column('character varying', {
    name: 'email',
  })
  public email!: string;

  @Column('character varying', {
    name: 'password',
  })
  public password!: string;
}
