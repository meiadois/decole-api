import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '@database/entity/route';
import { StoreRouteDTO } from './dto';
import { PaginationI } from '@shared/decorators/pagination.decorator';
import { UpdateRouteDTO } from './dto/update-route.dto';
import { Logger } from '@/shared/logger/Logger';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routesRepository: Repository<Route>,
    private logger: Logger
  ) {
    this.logger.setContext('RoutesService');
  }

  async getAll(pagination: PaginationI): Promise<Route[]> {
    return await this.routesRepository.find({
      // relations : ['lessons'],
      ...pagination
    });
  }
  async getOne(id: string): Promise<Route> {
    this.logger.log(`Listando rota ${id}`);
    const route = await this.routesRepository.findOne(id, {
      relations : ['lessons']
    });

    if(!route){
      throw new HttpException('Rota não encontrada', HttpStatus.FORBIDDEN);
    }
    return route
  }

  async store(storeRouteDTO: StoreRouteDTO): Promise<Route> {
    this.logger.log(`Cadastrando rota ${storeRouteDTO.title}`);
    const route = new Route()

    route.order = storeRouteDTO.order
    route.description = storeRouteDTO.description
    route.title = storeRouteDTO.title


    route.requiredRoutes = storeRouteDTO.requiredRouteIds.map((routeId) => {
      const r = new Route()
      r.id = routeId
      return r
    })

    return await this.routesRepository.save(route);
  }

  async update(id: string, updateRouteDTO: UpdateRouteDTO): Promise<Route> {
    this.logger.log(`Editando rota ${id}`);
    const route = await this.routesRepository.findOne(id)

    if(!route){
      throw new HttpException('Rota não encontrada', HttpStatus.FORBIDDEN);
    }

    route.title = updateRouteDTO.title
    route.description = updateRouteDTO.description
    route.order = updateRouteDTO.order

    route.requiredRoutes = updateRouteDTO.requiredRouteIds.map((routeId) => {
      const r = new Route()
      r.id = routeId
      return r
    })

    return await this.routesRepository.save(route);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Removendo rota ${id}`);
    await this.routesRepository.delete(id);
  }
}
