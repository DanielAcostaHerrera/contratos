import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { ContratoClausulaService } from './contrato-clausulas.service';
import { CreateContratoClausulaInput } from './dto/create-contrato-clausulas.input';

@Resolver(() => ContratoClausulas)
export class ContratoClausulasResolver {
  constructor(private readonly contratoClausulaService: ContratoClausulaService) {}

  @Mutation(() => ContratoClausulas)
  @UseGuards(new AuthGuard())
  createContratoClausulas(@Args('createContratoClausulaInput') createContratoClausulaInput: CreateContratoClausulaInput) {
    return this.contratoClausulaService.save(createContratoClausulaInput);
  }

  @Query(() => [ContratoClausulas])
  @UseGuards(new AuthGuard())
  findAllContratoClausulas() {
    return this.contratoClausulaService.findAll();
  }

  @Query(() => ContratoClausulas)
  @UseGuards(new AuthGuard())
  findOneContratoClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.contratoClausulaService.findOne(id);
  }

  @Mutation(() => ContratoClausulas)
  @UseGuards(new AuthGuard())
  removeContratoClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.contratoClausulaService.remove(id);
  }

  @Mutation(() => [ContratoClausulas])
  @UseGuards(new AuthGuard())
  removeSeveralContratoClausulas(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.contratoClausulaService.removeSeveral(id);
  }

  @ResolveField(() => Contratos, {nullable: true})
  contratos(@Parent() contratoClausulas: ContratoClausulas): Promise<Contratos> {
    return this.contratoClausulaService.getContrato(contratoClausulas.idContrato);
  }
}
