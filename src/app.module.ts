import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ItemsModule } from "./items/items.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ItemsModule
  ]
})
export class AppModule {
}
