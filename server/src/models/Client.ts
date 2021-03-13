import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import Schedule from './Schedule';
import Rating from './Rating';
import bcryptjs from 'bcryptjs';

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

  @OneToMany(() => Schedule, (schedule) => schedule.client, { cascade: true })
  @JoinColumn({ name: 'client_id' })
  schedules: Schedule[];

  @OneToMany(() => Rating, (rating) => rating.client, { cascade: true })
  @JoinColumn({ name: 'client_id' })
  ratings: Rating[];

  @BeforeInsert()
  @BeforeUpdate()
  async generatePasswordHash() {
    this.password = await bcryptjs.hash(this.password, 8);
  }

  public passwordIsValid(password: string) {
    return bcryptjs.compare(password, this.password);
  }
}
