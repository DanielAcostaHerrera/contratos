import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { CompaniasNavierasService } from './companias-navieras.service';

@Resolver(() => CompaniasNavieras)
export class CompaniasNavierasResolver {
  constructor(private readonly companiasNavierasService: CompaniasNavierasService) {}

  @Query(() => [CompaniasNavieras])
  findAllCompaniasNavieras() {
    return this.companiasNavierasService.findAll();
  }

  @Query(() => CompaniasNavieras)
  findOneCompaniasNavieras(@Args('id', { type: () => Int }) id: number) {
    return this.companiasNavierasService.findOne(id);
  }
}
