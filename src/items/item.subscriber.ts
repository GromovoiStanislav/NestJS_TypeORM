import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent, RemoveEvent, UpdateEvent
} from "typeorm";
import { Item } from "./entities/item.entity";
import { Logger } from "@nestjs/common";

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {

  private readonly logger = new Logger(ItemSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Item;
  }

  beforeInsert(event: InsertEvent<Item>) {
    this.logger.log(`@BeforeInsert`, JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Item>) {

    this.logger.log(`@AfterInsert`, JSON.stringify(event.entity));
  }


  beforeUpdate(event: UpdateEvent<Item>) {
    this.logger.log(`@BeforeUpdate`, JSON.stringify(event.entity));
  }

  afterUpdate(event: UpdateEvent<Item>) {
    this.logger.log(`@AfterUpdate`, JSON.stringify(event.entity));
  }


  beforeRemove(event: RemoveEvent<Item>) {
    // undefined
    this.logger.log(`@BeforeRemove`, JSON.stringify(event.entity));
  }

  afterRemove(event: RemoveEvent<Item>) {
    // undefined
    this.logger.log(`@AfterRemove`, JSON.stringify(event.entity));
  }


}
