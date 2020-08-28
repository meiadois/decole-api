import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Test } from '@nestjs/testing';

export interface PaginationI {
    skip: number;
    take: number;
}

export class Pagination implements PaginationI{
  @ApiProperty()
  @IsNumber()
  skip: number;

  @ApiProperty()
  @IsNumber()
  take: number;
}
export const Pag = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest();
    const pagination:Pagination = {
        skip: query.skip ? Number(query.skip) : 0,
        take: query.take ? Number(query.take) : 10
    }
    return pagination
  },
);


export const Teste = (): MethodDecorator & ClassDecorator =>{
  console.log("FOI")
  return
}