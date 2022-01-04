import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { ContratoClausulaService } from './contrato-clausulas.service';
import { CreateContratoClausulaInput } from './dto/create-contrato-clausulas.input';

@Resolver(() => ContratoClausulas)
export class ContratoClausulasResolver {
  constructor(private readonly contratoClausulaService: ContratoClausulaService) {}

  @Mutation(() => ContratoClausulas)
  createContratoClausulas(@Args('createContratoClausulaInput') createContratoClausulaInput: CreateContratoClausulaInput) {
    return this.contratoClausulaService.save(createContratoClausulaInput);
  }

  @Query(() => [ContratoClausulas])
  findAllContratoClausulas() {
    return this.contratoClausulaService.findAll();
  }

  @Query(() => ContratoClausulas)
  findOneContratoClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.contratoClausulaService.findOne(id);
  }

  @Mutation(() => ContratoClausulas)
  removeContratoClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.contratoClausulaService.remove(id);
  }

  @Mutation(() => [ContratoClausulas])
  removeSeveralContratoClausulas(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.contratoClausulaService.removeSeveral(id);
  }

  @ResolveField(() => Contratos, {nullable: true})
  contratos(@Parent() contratoClausulas: ContratoClausulas): Promise<Contratos> {
    return this.contratoClausulaService.getContrato(contratoClausulas.idContrato);
  }
}
