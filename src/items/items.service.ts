import { Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { EntityManager, Repository } from "typeorm";
import { Item } from "./entities/item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Listing } from "./entities/listing.entity";
import { Comment } from "./entities/comment.entity";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly entityManager: EntityManager
  ) {
  }


  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0
    });
    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto)
    );
    // this.itemsRepository.create(data)
    const item = new Item({
      ...createItemDto,
      comments: [],
      tags,
      listing
    });
    return this.itemsRepository.save(item);
    //return this.entityManager.save(item);
  }


  async findAll() {
    return this.itemsRepository.find();
  }


  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true, tags: true }
    });
  }


  async update(id: number, updateItemDto: UpdateItemDto) {
    // const item = await this.itemsRepository.findOneBy({ id });
    // item.public = updateItemDto.public;
    // await this.commentsRepository.delete({ item });
    // const comments = updateItemDto.comments.map(
    //   (createCommentDto) => new Comment(createCommentDto),
    // );
    // item.comments = comments;
    // return this.itemsRepository.save(item);

    return this.entityManager.transaction(async (entityManager) => {
      const tagContent = `${Math.random()}`;
      const tag = new Tag({ content: tagContent });
      await entityManager.save(tag);


      const item = await this.itemsRepository.findOneBy({ id });
      item.public = updateItemDto.public;
      await entityManager.delete(Comment, { item });
      const comments = updateItemDto.comments.map(
        (createCommentDto) => new Comment(createCommentDto)
      );
      item.comments = comments;
      return entityManager.save(item);
    });
  }

  async remove(id: number) {
    return this.entityManager.delete(Item, { id });
    //return this.itemsRepository.delete(id);
  }

}
