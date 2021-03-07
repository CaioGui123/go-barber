import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Barber from './Barber';
import Client from './Client';

@Entity('barber_client')
export default class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  scheduled_at: string;

  @Column()
  scheduled_to: string;

  @Column({ default: false })
  is_cutted: boolean;

  @Column({ default: false })
  is_accepted: boolean;

  @Column()
  price: number;

  @Column()
  barber_id: number;

  @Column()
  client_id: number;

  @ManyToOne(() => Barber, (barber) => barber.schedules)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @ManyToOne(() => Client, (client) => client.schedules)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
