import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { StepsService } from './steps.service';
import { Step } from '@database/entity/step';
import { StoreStepDTO, UpdateStepDTO } from './dto';
import { Pagination, Pag } from '@shared/decorators/pagination.decorator';


@ApiTags('steps')
@Controller('steps')
export class StepsController {
  constructor(private readonly service: StepsService) {}

  @ApiOkResponse({
    description: 'Etapas obtidas com sucesso.',
    type: [Step],
  })
  @Get('/')
  async getAll(
      @Query('lessonId') lessonId: string, @Pag() pagination: Pagination
    ): Promise<Step[]> {
    return this.service.getAll(pagination, lessonId)
  }

  @ApiCreatedResponse({
    description: 'Etapa cadastrada com sucesso.',
    type: Step,
  })
  @Post('/')
  async storeOne(@Body() storeStepDTO: StoreStepDTO): Promise<Step> {
    return await this.service.store(storeStepDTO)
  }

  @ApiOkResponse({
    description: 'Etapa obtida com sucesso.',
    type: Step,
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Step> {
    return this.service.getOne(id)
  }

  @ApiOkResponse({
    description: 'Etapa editada com sucesso.',
    type: Step,
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStepDTO: UpdateStepDTO): Promise<Step> {
    return this.service.update(id, updateStepDTO)
  }

  @ApiOkResponse({
    description: 'Etapa removida com sucesso.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id)
  }
}
