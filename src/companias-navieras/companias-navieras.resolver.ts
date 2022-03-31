import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { CompaniasNavierasService } from './companias-navieras.service';

@Resolver(() => CompaniasNavieras)
export class CompaniasNavierasResolver {
  constructor(private readonly companiasNavierasService: CompaniasNavierasService) {}

  @Query(() => [CompaniasNavieras])
  @UseGuards(new AuthGuard())
  findAllCompaniasNavieras() {
    return this.companiasNavierasService.findAll();
  }

  @Query(() => CompaniasNavieras)
  @UseGuards(new AuthGuard())
  findOneCompaniasNavieras(@Args('id', { type: () => Int }) id: number) {
    return this.companiasNavierasService.findOne(id);
  }
}
