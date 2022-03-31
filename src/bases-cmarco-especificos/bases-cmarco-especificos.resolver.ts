import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { BasesCmarcoEspecificosService } from './bases-cmarco-especificos.service';
import { CreateBasesCmarcoEspecificoInput } from './dto/create-bases-cmarco-especifico.input';
import { BasesCMarcoEspecificos } from 'src/models/entities/BasesCMarcoEspecificos.entity';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { Especificos } from 'src/modelsMercurio/entities/Especificos.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => BasesCMarcoEspecificos)
export class BasesCmarcoEspecificosResolver {
  constructor(private readonly basesCmarcoEspecificosService: BasesCmarcoEspecificosService) {}

  @Mutation(() => BasesCMarcoEspecificos)
  @UseGuards(new AuthGuard())
  createBasesCmarcoEspecifico(@Args('createBasesCmarcoEspecificoInput') createBasesCmarcoEspecificoInput: CreateBasesCmarcoEspecificoInput) {
    return this.basesCmarcoEspecificosService.save(createBasesCmarcoEspecificoInput);
  }

  @Query(() => [BasesCMarcoEspecificos])
  @UseGuards(new AuthGuard())
  findAllBasesCmarcoEspecificos() {
    return this.basesCmarcoEspecificosService.findAll();
  }

  @Query(() => BasesCMarcoEspecificos)
  @UseGuards(new AuthGuard())
  findOneBasesCmarcoEspecificos(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoEspecificosService.findOne(id);
  }

  @ResolveField(() => BasesCMarco, {nullable: true})
  baseCMarco(@Parent() basesCMarcoEspecificos: BasesCMarcoEspecificos): Promise<BasesCMarco> {
    return this.basesCmarcoEspecificosService.getBaseCMarco(basesCMarcoEspecificos.idBaseCMarco);
  }

  @ResolveField(() => Especificos, {nullable: true})
  especifico(@Parent() basesCMarcoEspecificos: BasesCMarcoEspecificos): Promise<Especificos> {
    return this.basesCmarcoEspecificosService.getEspecifico(basesCMarcoEspecificos.idEspecifico);
  }

  @Mutation(() => BasesCMarcoEspecificos)
  @UseGuards(new AuthGuard())
  removeBasesCmarcoEspecifico(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoEspecificosService.remove(id);
  }

  @Mutation(() => [BasesCMarcoEspecificos])
  @UseGuards(new AuthGuard())
  removeSeveralBasesCmarcoEspecifico(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.basesCmarcoEspecificosService.removeSeveral(id);
  }
}
