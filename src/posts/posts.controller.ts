import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Post as PostObject } from './Post';
import { PostsService } from './posts.service';



@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    async findAll(@Body() params): Promise<any> {
      return this.postsService.findAll(params.tokenId, params.page, params.limit);
    }

    @Post(':id')
    async findById(@Param() params) {
        return this.postsService.findById(params.tokenId, params.id);
    }

    @Post()
    create(@Body() body: PostObject) {
        return this.postsService.create(body);
    }
}
