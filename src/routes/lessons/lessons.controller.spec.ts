import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '@/database/entity/lesson';
import { Step } from '@/database/entity/step';
import { LoggerModule } from '@/shared/logger/logger.module';

describe('RoutesController', () => {
  let lessonsController: LessonsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Lesson, Step]), LoggerModule],
      controllers: [LessonsController],
      providers: [LessonsService],
    }).compile();

    lessonsController = app.get<LessonsController>(LessonsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await lessonsController.getAll(null, null)).toBeDefined()
    });
  });
});
