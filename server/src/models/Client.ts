import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export default class Client {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  mobile_phone: string;

  @Column()
  image: string;
}
