import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProformaClausulasService } from './proforma-clausulas.service';
import { CreateProformaClausulaInput } from './dto/create-proforma-clausula.input';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';

@Resolver(() => ProformaClausulas)
export class ProformaClausulasResolver {
  constructor(private readonly proformaClausulasService: ProformaClausulasService) {}

  @Mutation(() => ProformaClausulas)
  createProformaClausula(@Args('createProformaClausulaInput') createProformaClausulaInput: CreateProformaClausulaInput) {
    return this.proformaClausulasService.save(createProformaClausulaInput);
  }

  @Query(() => [ProformaClausulas])
  findAllProformaClausulas() {
    return this.proformaClausulasService.findAll();
  }

  @Query(() => ProformaClausulas)
  findOneProformaClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.proformaClausulasService.findOne(id);
  }

  @Mutation(() => ProformaClausulas)
  removeProformaClausula(@Args('id', { type: () => Int }) id: number) {
    return this.proformaClausulasService.remove(id);
  }

  @ResolveField(() => TiposDeClausulas, {nullable: true})
  tiposDeClausulas(@Parent() tiposDeClausulas: TiposDeClausulas) {
    return this.proformaClausulasService.getTipoClausula(tiposDeClausulas.idTipoClausula);
  }

  @ResolveField(() => Proformas, {nullable: true})
  proformas(@Parent() proformas: Proformas) {
    return this.proformaClausulasService.getProforma(proformas.idProforma);
  }
}
