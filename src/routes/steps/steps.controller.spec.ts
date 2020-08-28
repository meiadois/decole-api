import { Test, TestingModule } from '@nestjs/testing';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from '@/database/entity/step';

describe('RoutesController', () => {
  let stepsController: StepsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Step])],
      controllers: [StepsController],
      providers: [StepsService],
    }).compile();

    stepsController = app.get<StepsController>(StepsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await stepsController.getAll(null, null)).toBeDefined()
    });
  });
});
