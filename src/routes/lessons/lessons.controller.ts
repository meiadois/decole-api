import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { LessonsService } from './lessons.service';
import { Lesson } from '@database/entity/lesson';
import { StoreLessonDTO, UpdateLessonDTO } from './dto';
import { Pagination, Pag } from '@shared/decorators/pagination.decorator';


@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @ApiOkResponse({
    description: 'Lições obtidas com sucesso.',
    type: [Lesson],
  })
  @Get('/')
  async getAll(
    @Query('routeId') routeId: string,
    @Pag() pagination: Pagination
    ): Promise<Lesson[]> {
    return this.service.getAll(pagination, routeId)
  }

  @ApiCreatedResponse({
    description: 'Lição cadastrada com sucesso.',
    type: Lesson,
  })
  @Post('/')
  async storeOne(@Body() storeLessonDTO: StoreLessonDTO): Promise<Lesson> {
    return await this.service.store(storeLessonDTO)
  }

  @ApiOkResponse({
    description: 'Lição obtida com sucesso.',
    type: Lesson,
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Lesson> {
    return this.service.getOne(id)
  }

  @ApiOkResponse({
    description: 'Lição editada com sucesso.',
    type: Lesson,
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLessonDTO: UpdateLessonDTO): Promise<Lesson> {
    return this.service.update(id, updateLessonDTO)
  }

  @ApiOkResponse({
    description: 'Lição removida com sucesso.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id)
  }
}
