import "dotenv/config";
import { ConfigService } from "@nestjs/config";
//import { config } from "dotenv";

import { DataSource } from "typeorm";
import { Item } from "./src/items/entities/item.entity";
import { Listing } from "./src/items/entities/listing.entity";
import { Comment } from "./src/items/entities/comment.entity";
import { Tag } from "./src/items/entities/tag.entity";

//config();
const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  host: configService.getOrThrow<string>("DB_HOST"),
  port: configService.getOrThrow<number>("DB_PORT"),
  database: configService.getOrThrow<string>("DB_DATABASE"),
  username: configService.getOrThrow<string>("DB_USERNAME"),
  password: configService.getOrThrow<string>("DB_PASSWORD"),
  migrations: ["migrations/**"],
  entities: [Item, Listing, Comment, Tag]
});
