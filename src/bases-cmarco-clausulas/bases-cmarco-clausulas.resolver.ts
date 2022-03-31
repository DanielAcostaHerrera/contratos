import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BasesCmarcoClausulasService } from './bases-cmarco-clausulas.service';
import { BasesCMarcoClausulas } from 'src/models/entities/BasesCMarcoClausulas.entity';
import { CreateBasesCmarcoClausulaInput } from './dto/create-bases-cmarco-clausula.input';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => BasesCMarcoClausulas)
export class BasesCmarcoClausulasResolver {
  constructor(private readonly basesCmarcoClausulasService: BasesCmarcoClausulasService) {}

  @Mutation(() => BasesCMarcoClausulas)
  @UseGuards(new AuthGuard())
  createBasesCmarcoClausula(@Args('createBasesCmarcoClausulaInput') createBasesCmarcoClausulaInput: CreateBasesCmarcoClausulaInput) {
    return this.basesCmarcoClausulasService.save(createBasesCmarcoClausulaInput);
  }

  @Query(() => [BasesCMarcoClausulas])
  @UseGuards(new AuthGuard())
  findAllBasesCMarcoClausula() {
    return this.basesCmarcoClausulasService.findAll();
  }

  @Query(() => BasesCMarcoClausulas)
  @UseGuards(new AuthGuard())
  findOneBasesCMarcoClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoClausulasService.findOne(id);
  }

  @ResolveField(() => BasesCMarco, {nullable: true})
  basesCMarco(@Parent() basesCMarcoClausulas: BasesCMarcoClausulas): Promise<BasesCMarco> {
    return this.basesCmarcoClausulasService.getBaseCMarco(basesCMarcoClausulas.idBaseCMarco);
  }

  @ResolveField(() => TiposDeClausulas, {nullable: true})
  tipoDeClausula(@Parent() basesCMarcoClausulas: BasesCMarcoClausulas): Promise<TiposDeClausulas> {
    return this.basesCmarcoClausulasService.getTipoDeClausula(basesCMarcoClausulas.idTipoClausula);
  }

  @ResolveField(() => ProformaClausulas, {nullable: true})
  proformaClausulas(@Parent() basesCMarcoClausulas: BasesCMarcoClausulas): Promise<ProformaClausulas> {
    return this.basesCmarcoClausulasService.getProformaClausula(basesCMarcoClausulas.idProformaClausula);
  }

  @Mutation(() => BasesCMarcoClausulas)
  @UseGuards(new AuthGuard())
  removeBasesCmarcoClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoClausulasService.remove(id);
  }

  @Mutation(() => [BasesCMarcoClausulas])
  @UseGuards(new AuthGuard())
  removeSeveralBasesCmarcoClausula(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.basesCmarcoClausulasService.removeSeveral(id);
  }
}
