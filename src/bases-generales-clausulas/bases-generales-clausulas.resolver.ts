import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BasesGeneralesClausulasService } from './bases-generales-clausulas.service';
import { CreateBasesGeneralesClausulaInput } from './dto/create-bases-generales-clausula.input';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';

@Resolver(() => BasesGeneralesClausulas)
export class BasesGeneralesClausulasResolver {
  constructor(private readonly basesGeneralesClausulasService: BasesGeneralesClausulasService) {}

  @Mutation(() => BasesGeneralesClausulas)
  createBasesGeneralesClausula(@Args('createBasesGeneralesClausulaInput') createBasesGeneralesClausulaInput: CreateBasesGeneralesClausulaInput) {
    return this.basesGeneralesClausulasService.save(createBasesGeneralesClausulaInput);
  }

  @Query(() => [BasesGeneralesClausulas])
  findAllBasesGeneralesClausulas() {
    return this.basesGeneralesClausulasService.findAll();
  }

  @Query(() => BasesGeneralesClausulas)
  findOneBasesGeneralesClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesClausulasService.findOne(id);
  }

  @Mutation(() => BasesGeneralesClausulas)
  removeBasesGeneralesClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesClausulasService.remove(id);
  }

  @ResolveField(() => TiposDeClausulas, {nullable: true})
  tiposDeClausulas(@Parent() basesGeneralesClausulas: BasesGeneralesClausulas): Promise<TiposDeClausulas> {
    return this.basesGeneralesClausulasService.getTipoClausula(basesGeneralesClausulas.idTipoClausula);
  }

  @ResolveField(() => BasesGenerales, {nullable: true})
  basesGenerales(@Parent() basesGeneralesClausulas: BasesGeneralesClausulas): Promise<BasesGenerales> {
    return this.basesGeneralesClausulasService.getBasesGenerales(basesGeneralesClausulas.idBasesGenerales);
  }

  @ResolveField(() => ProformaClausulas, {nullable: true})
  proformaClausula(@Parent() basesGeneralesClausulas: BasesGeneralesClausulas): Promise<ProformaClausulas> {
    return this.basesGeneralesClausulasService.getProformaClausulas(basesGeneralesClausulas.idProformaClausula);
  }
}
