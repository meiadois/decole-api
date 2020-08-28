import { Test, TestingModule } from '@nestjs/testing';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { Route } from '@/database/entity/route';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('RoutesController', () => {
  let routesController: RoutesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Route])],
      controllers: [RoutesController],
      providers: [RoutesService],
    }).compile();

    routesController = app.get<RoutesController>(RoutesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await routesController.getAll(null)).toBeDefined()
    });
  });
});
