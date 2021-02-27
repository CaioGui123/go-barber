import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import BarberImage from './BarberImage';

@Entity('barbers')
export default class Barber {
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
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @OneToMany(() => BarberImage, (image) => image.barber, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'barber_id' })
  images: BarberImage[];
}
