import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Image from './Image';

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

  @OneToOne(() => Image, (image) => image.client, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'image_id' })
  image: Image;
}
