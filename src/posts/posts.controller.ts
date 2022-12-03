import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Post as PostObject } from './Post';
import { PostsService } from './posts.service';



@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async findAll(@Param() params): Promise<any> {
      return this.postsService.findAll(params.tokenId);
    }

    @Get(':id')
    async findById(@Param() params) {
        return this.postsService.findById(params.tokenId, params.id);
    }

    @Post()
    create(@Body() body: PostObject, @Param() params) {
        return this.postsService.create(params.token, body);
    }
}
