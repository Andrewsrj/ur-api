import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Post as PostObject } from './Post';
import { PostsService } from './posts.service';



@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async findAll(): Promise<any> {
      return this.postsService.findAll();
    }

    @Get(':id')
    async findById(@Param() params) {
        return this.postsService.findById(params.id);
    }

    @Post()
    create(@Body() body: PostObject) {
        return this.postsService.create(body);
    }
}
