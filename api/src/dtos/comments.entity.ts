import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  comment: string;

  @Column()
  idpost: number;
}
