import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Address } from '../address/address.entity';

const HASH_SALT_ROUNDS = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 100 })
  lastname: string;

  @Column({ nullable: false, length: 150, unique: true })
  email: string;

  @Column({ nullable: false, length: 255 })
  password: string;

  @Column({ nullable: false, length: 16, unique: true })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async beforeInser() {
    this.password = await bcrypt.hash(this.password, HASH_SALT_ROUNDS);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.password = await bcrypt.hash(this.password, HASH_SALT_ROUNDS);
  }
}
