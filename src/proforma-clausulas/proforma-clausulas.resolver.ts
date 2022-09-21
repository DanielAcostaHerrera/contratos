import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { ProformaClausulasService } from './proforma-clausulas.service';
import { CreateProformaClausulaInput } from './dto/create-proforma-clausula.input';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
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

  @Mutation(() => [ProformaClausulas])
  @UseGuards(new AuthGuard())
  createSeveralProformaClausula(@Args('createProformaClausulaInput',{ type: () => [CreateProformaClausulaInput] }) createProformaClausulaInput: CreateProformaClausulaInput[]) {
    return this.proformaClausulasService.saveSeveral(createProformaClausulaInput);
  }

  @Query(() => [ProformaClausulas])
  @UseGuards(new AuthGuard())
  findAllProformaClausulas() {
    return this.proformaClausulasService.findAll();
  }

  @Query(() => [ProformaClausulas])
  @UseGuards(new AuthGuard())
  findAllProformaClausulasById(
    @Args('idTipoContrato', { type: () => Int }) idTipoContrato: number,
    @Args('idIncoterm', { type: () => Int }) idIncoterm: number) {
    return this.proformaClausulasService.findAllById(idTipoContrato,idIncoterm);
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
}
