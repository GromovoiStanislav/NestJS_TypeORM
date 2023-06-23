import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AbstractEntity } from "../../database/abstract.entity";
import { Item } from "./item.entity";


@Entity()
export class Listing extends AbstractEntity<Listing> {
  @Column()
  description: string;

  @Column()
  rating: number;

  @OneToOne(() => Item, (item) => item.listing, { onDelete: "CASCADE" })
  @JoinColumn()
  item: Item;
}
