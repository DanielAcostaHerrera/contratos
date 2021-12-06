import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BasesCmarcoClausulasService } from './bases-cmarco-clausulas.service';
import { BasesCMarcoClausulas } from 'src/models/entities/BasesCMarcoClausulas.entity';
import { CreateBasesCmarcoClausulaInput } from './dto/create-bases-cmarco-clausula.input';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';

@Resolver(() => BasesCMarcoClausulas)
export class BasesCmarcoClausulasResolver {
  constructor(private readonly basesCmarcoClausulasService: BasesCmarcoClausulasService) {}

  @Mutation(() => BasesCMarcoClausulas)
  createBasesCmarcoClausula(@Args('createBasesCmarcoClausulaInput') createBasesCmarcoClausulaInput: CreateBasesCmarcoClausulaInput) {
    return this.basesCmarcoClausulasService.save(createBasesCmarcoClausulaInput);
  }

  @Query(() => [BasesCMarcoClausulas])
  findAllBasesCMarcoClausula() {
    return this.basesCmarcoClausulasService.findAll();
  }

  @Query(() => BasesCMarcoClausulas)
  findOneBasesCMarcoClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoClausulasService.findOne(id);
  }

  @ResolveField(() => BasesCMarco, {nullable: true})
  basesCMarco(@Parent() basesCMarco: BasesCMarco) {
    return this.basesCmarcoClausulasService.getBaseCMarco(basesCMarco.idBaseCMarco);
  }

  @ResolveField(() => TiposDeClausulas, {nullable: true})
  tipoDeClausula(@Parent() tiposDeClausulas: TiposDeClausulas) {
    return this.basesCmarcoClausulasService.getTipoDeClausula(tiposDeClausulas.idTipoClausula);
  }

  @ResolveField(() => ProformaClausulas, {nullable: true})
  proformaClausulas(@Parent() proformaClausulas: ProformaClausulas) {
    return this.basesCmarcoClausulasService.getProformaClausula(proformaClausulas.idProformaClausula);
  }

  @Mutation(() => BasesCMarcoClausulas)
  removeBasesCmarcoClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoClausulasService.remove(id);
  }
}
