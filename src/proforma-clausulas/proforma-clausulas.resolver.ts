import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProformaClausulasService } from './proforma-clausulas.service';
import { CreateProformaClausulaInput } from './dto/create-proforma-clausula.input';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => ProformaClausulas)
export class ProformaClausulasResolver {
  constructor(private readonly proformaClausulasService: ProformaClausulasService) {}

  @Mutation(() => ProformaClausulas)
  @UseGuards(new AuthGuard())
  createProformaClausula(@Args('createProformaClausulaInput') createProformaClausulaInput: CreateProformaClausulaInput) {
    return this.proformaClausulasService.save(createProformaClausulaInput);
  }

  @Query(() => [ProformaClausulas])
  @UseGuards(new AuthGuard())
  findAllProformaClausulas() {
    return this.proformaClausulasService.findAll();
  }

  @Query(() => ProformaClausulas)
  @UseGuards(new AuthGuard())
  findOneProformaClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.proformaClausulasService.findOne(id);
  }

  @Mutation(() => ProformaClausulas)
  @UseGuards(new AuthGuard())
  removeProformaClausula(@Args('id', { type: () => Int }) id: number) {
    return this.proformaClausulasService.remove(id);
  }

  @Mutation(() => [ProformaClausulas])
  @UseGuards(new AuthGuard())
  removeSeveralProformaClausula(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.proformaClausulasService.removeSeveral(id);
  }

  @ResolveField(() => TiposDeClausulas, {nullable: true})
  tiposDeClausulas(@Parent() proformaClausulas: ProformaClausulas): Promise<TiposDeClausulas> {
    return this.proformaClausulasService.getTipoClausula(proformaClausulas.idTipoClausula);
  }

  @ResolveField(() => Proformas, {nullable: true})
  proformas(@Parent() proformaClausulas: ProformaClausulas): Promise<Proformas> {
    return this.proformaClausulasService.getProforma(proformaClausulas.idProforma);
  }
}
