import { Cart } from "src/modules/cart/entities/cart.entity";
import { Order } from "src/modules/orders/entities/order.entity";
import { Review } from "src/modules/reviews/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // admin or user
  @Column()
  role: string;

  @Column({ default: '' })
  profile: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[]

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];
}
