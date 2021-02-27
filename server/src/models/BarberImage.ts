import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Barber from './Barber';

@Entity('barber_image')
export default class BarberImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  barber_id: string;

  @ManyToOne(() => Barber, (barber) => barber.images)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;
}
