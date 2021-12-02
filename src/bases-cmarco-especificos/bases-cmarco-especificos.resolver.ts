import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasesCmarcoEspecificosService } from './bases-cmarco-especificos.service';
import { CreateBasesCmarcoEspecificoInput } from './dto/create-bases-cmarco-especifico.input';
import { BasesCMarcoEspecificos } from 'src/models/entities/BasesCMarcoEspecificos.entity';

@Resolver(() => BasesCMarcoEspecificos)
export class BasesCmarcoEspecificosResolver {
  constructor(private readonly basesCmarcoEspecificosService: BasesCmarcoEspecificosService) {}

  @Mutation(() => BasesCMarcoEspecificos)
  createBasesCmarcoEspecifico(@Args('createBasesCmarcoEspecificoInput') createBasesCmarcoEspecificoInput: CreateBasesCmarcoEspecificoInput) {
    return this.basesCmarcoEspecificosService.save(createBasesCmarcoEspecificoInput);
  }

  @Query(() => [BasesCMarcoEspecificos])
  findAllBasesCmarcoEspecificos() {
    return this.basesCmarcoEspecificosService.findAll();
  }

  @Query(() => BasesCMarcoEspecificos)
  findOneBasesCmarcoEspecificos(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoEspecificosService.findOne(id);
  }

  @Mutation(() => BasesCMarcoEspecificos)
  removeBasesCmarcoEspecifico(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoEspecificosService.remove(id);
  }
}
