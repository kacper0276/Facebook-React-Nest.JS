import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  likedpost: string;

  @Column()
  friendsid: string;

  @Column()
  profileImg: string;

  @Column()
  invitedFriends: string;

  @Column()
  invitedSended: string;
}
