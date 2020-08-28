import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '@database/entity/lesson';
import { StoreLessonDTO } from './dto';
import { PaginationI } from '@shared/decorators/pagination.decorator';
import { UpdateLessonDTO } from './dto/update-lesson.dto';
import { Route } from '@database/entity/route';
import { Step } from '@database/entity/step';
import { Logger } from '@shared/logger/Logger';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(Step)
    private readonly stepsRepository: Repository<Step>,
    private logger: Logger
  ) {
    this.logger.setContext('LessonsService');
  }

  async getAll(pagination: PaginationI, routeId?: string): Promise<Lesson[]> {
    const where = !routeId ? {} : {
      route: {
        id: routeId
      }
    }
    return await this.lessonsRepository.find({
      // relations : ['steps'],
      where,
      ...pagination
    });
  }
  async getOne(id: string): Promise<Lesson> {
    this.logger.log(`Listando lição ${id}`);
    const route = await this.lessonsRepository.findOne(id, {
      relations : ['steps']
    });

    if(!route){
      throw new HttpException('Lição não encontrada', HttpStatus.FORBIDDEN);
    }
    return route
  }

  async store(storeLessonDTO: StoreLessonDTO): Promise<Lesson> {
    this.logger.log(`Cadastrando lição ${storeLessonDTO.title}`);
    const lesson = new Lesson()

    lesson.order = storeLessonDTO.order
    lesson.description = storeLessonDTO.description
    lesson.title = storeLessonDTO.title

    lesson.route = new Route()
    lesson.route.id = storeLessonDTO.routeId

    let steps = []
    if(storeLessonDTO.stepIds){
      steps = steps.concat(
        storeLessonDTO.stepIds.map((stepId) => {
          const s = new Step()
          s.id = stepId
          return s
        })
      )
    }
    if(storeLessonDTO.steps){
      steps = steps.concat(
        await this.stepsRepository.save(storeLessonDTO.steps)
      )
    }

    lesson.steps = steps

    lesson.requiredLessons = storeLessonDTO.requiredLessonIds.map((lessonId) => {
      const l = new Lesson()
      l.id = lessonId
      return l
    })

    return await this.lessonsRepository.save(lesson);
  }

  async update(id: string, updateLessonDTO: UpdateLessonDTO): Promise<Lesson> {
    this.logger.log(`Editando lição ${id}`);
    const lesson = await this.lessonsRepository.findOne(id)

    if(!lesson){
      throw new HttpException('Lição não encontrada', HttpStatus.FORBIDDEN);
    }

    lesson.title = updateLessonDTO.title
    lesson.description = updateLessonDTO.description
    lesson.order = updateLessonDTO.order

    return await this.lessonsRepository.save(lesson);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Removendo lição ${id}`);
    await this.lessonsRepository.delete(id);
  }
}
