import { Controller, Get, Param, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route } from '@/database/entity/route';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { StoreRouteDTO, UpdateRouteDTO } from './dto';
import { Pagination, Pag } from '@/shared/decorators/pagination.decorator';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly service: RoutesService) {}

  @ApiOkResponse({
    description: 'Rotas obtidas com sucesso.',
    type: [Route],
  })
  @Get('/')
  async getAll(@Pag() pagination: Pagination): Promise<Route[]> {
    return this.service.getAll(pagination)
  }

  @ApiCreatedResponse({
    description: 'Rota cadastrada com sucesso.',
    type: Route,
  })
  @Post('/')
  async storeOne(@Body() storeRouteDTO: StoreRouteDTO): Promise<Route> {
    return await this.service.store(storeRouteDTO)
  }

  @ApiOkResponse({
    description: 'Rota obtida com sucesso.',
    type: Route,
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Route> {
    return this.service.getOne(id)
  }

  @ApiOkResponse({
    description: 'Rota editada com sucesso.',
    type: Route,
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRouteDTO: UpdateRouteDTO): Promise<Route> {
    return this.service.update(id, updateRouteDTO)
  }

  @ApiOkResponse({
    description: 'Rota removida com sucesso.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id)
  }
}
