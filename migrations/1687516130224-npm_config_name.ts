import { MigrationInterface, QueryRunner } from "typeorm";

export class NpmConfigName1687516130224 implements MigrationInterface {
    name = 'NpmConfigName1687516130224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "listing" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "rating" integer NOT NULL, "itemId" integer, CONSTRAINT "REL_c73b1fe44b3107728fbd1d839e" UNIQUE ("itemId"), CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "itemId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "public" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_tags_tag" ("itemId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_8e877df38e46ea03afaa8ce3577" PRIMARY KEY ("itemId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5054f98dd0c65e7fe5be4e2660" ON "item_tags_tag" ("itemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b3d7c2df025e808ef2cbd12286" ON "item_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_c73b1fe44b3107728fbd1d839e8" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_d7846a91e6eb1ddcef861577e02" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_tags_tag" ADD CONSTRAINT "FK_5054f98dd0c65e7fe5be4e2660c" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_tags_tag" ADD CONSTRAINT "FK_b3d7c2df025e808ef2cbd12286b" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_tags_tag" DROP CONSTRAINT "FK_b3d7c2df025e808ef2cbd12286b"`);
        await queryRunner.query(`ALTER TABLE "item_tags_tag" DROP CONSTRAINT "FK_5054f98dd0c65e7fe5be4e2660c"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_d7846a91e6eb1ddcef861577e02"`);
        await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_c73b1fe44b3107728fbd1d839e8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3d7c2df025e808ef2cbd12286"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5054f98dd0c65e7fe5be4e2660"`);
        await queryRunner.query(`DROP TABLE "item_tags_tag"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "listing"`);
    }

}
