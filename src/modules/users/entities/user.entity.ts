import { Cart } from "src/modules/cart/entities/cart.entity";
import { Notification } from "src/modules/notifications/entities/notification.entity";
import { Order } from "src/modules/orders/entities/order.entity";
import { Review } from "src/modules/reviews/entities/review.entity";
import { Wishlist } from "src/modules/wishlist/entities/wishlist.entity";
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

  @OneToMany(() => Wishlist, wishlist => wishlist.user)
  wishlist: Review[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Review[];

}
