import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { ContratoDesgloseService } from './contrato-desglose.service';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Resolver(() => ContratoDesglose)
export class ContratoDesgloseResolver {
  constructor(private readonly contratoDesgloseService: ContratoDesgloseService) {}

  @Mutation(() => ContratoDesglose)
  createContratoDesglose(@Args('createContratoDesgloseInput') createContratoDesgloseInput: CreateContratoDesgloseInput) {
    return this.contratoDesgloseService.save(createContratoDesgloseInput);
  }

  @Query(() => [ContratoDesglose])
  findAllContratoDesglose() {
    return this.contratoDesgloseService.findAll();
  }

  @Query(() => ContratoDesglose)
  findOneContratoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.findOne(id);
  }

  @Mutation(() => ContratoDesglose)
  removeContratoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.remove(id);
  }
}
