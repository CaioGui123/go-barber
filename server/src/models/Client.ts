import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
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

  @BeforeInsert()
  @BeforeUpdate()
  async generatePasswordHash() {
    this.password = await bcryptjs.hash(this.password, 8);
  }

  public passwordIsValid(password: string) {
    return bcryptjs.compare(password, this.password);
  }
}
