import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import BarberImage from './BarberImage';
import bcryptjs from 'bcryptjs';

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

  @BeforeInsert()
  @BeforeUpdate()
  async generatePasswordHash() {
    this.password = await bcryptjs.hash(this.password, 8);
  }

  public passwordIsValid(password: string) {
    return bcryptjs.compare(password, this.password);
  }
}
