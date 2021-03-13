import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Barber from './Barber';
import Client from './Client';

@Entity('rating')
export default class Rating {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  stars: number;

  @Column()
  body: string;

  @Column()
  barber_id: number | string;

  @Column()
  client_id: number | string;

  @ManyToOne(() => Barber, (barber) => barber.ratings)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @ManyToOne(() => Client, (client) => client.ratings)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
