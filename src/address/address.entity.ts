import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 200 })
  street: string;

  @Column({ nullable: false, length: 10 })
  street_number: string;

  @ManyToOne(() => User, (user) => user.addresses, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @Column({ nullable: true, length: 50 })
  // floor: string;

  // @Column({ nullable: true, length: 200 })
  // district: string;

  // @Column({ nullable: false, length: 10 })
  // zip: string;

  // @Column({ nullable: false, length: 200 })
  // state: string;

  // @Column({ nullable: false, length: 200 })
  // country: string;

  // @Column({ nullable: true, length: 255 })
  // details: string;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAtd: Date;
}
