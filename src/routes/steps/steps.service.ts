import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreStepDTO, UpdateStepDTO } from './dto';
import { PaginationI } from '@/shared/decorators/pagination.decorator';
import { Step } from '@/database/entity/step';
import { Lesson } from '@/database/entity/lesson';
import { Logger } from '@/shared/logger/Logger';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step)
    private readonly stepsRepository: Repository<Step>,
    private logger: Logger
  ) {
    this.logger.setContext('StepsService');
  }

  async getAll(pagination: PaginationI, lessonId?: string): Promise<Step[]> {
    const where = !lessonId ? {} : {
      lesson: {
        id: lessonId
      }
    }
    return await this.stepsRepository.find({
      // relations : ['steps'],
      where,
      ...pagination
    });
  }
  async getOne(id: string): Promise<Step> {
    this.logger.log(`Listando etapa ${id}`);
    const route = await this.stepsRepository.findOne(id, {
      // relations : ['steps']
    });

    if(!route){
      throw new HttpException('Etapa não encontrada', HttpStatus.FORBIDDEN);
    }
    return route
  }

  async store(storeStepDTO: StoreStepDTO): Promise<Step> {
    this.logger.log(`Cadastrado etapa na lição ${storeStepDTO.lessonId}`);
    const step = new Step()

    step.order = storeStepDTO.order
    step.message = storeStepDTO.message

    step.lesson = new Lesson()
    step.lesson.id = storeStepDTO.lessonId

    return await this.stepsRepository.save(step);
  }

  async update(id: string, updateStepDTO: UpdateStepDTO): Promise<Step> {
    this.logger.log(`Editando etapa ${id}`);
    const step = await this.stepsRepository.findOne(id)

    if(!step){
      throw new HttpException('Etapa não encontrada', HttpStatus.FORBIDDEN);
    }

    step.order = updateStepDTO.order
    step.message = updateStepDTO.message

    step.lesson = new Lesson()
    step.lesson.id = updateStepDTO.lessonId

    return await this.stepsRepository.save(step);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Removendo etapa ${id}`);
    await this.stepsRepository.delete(id);
  }
}
