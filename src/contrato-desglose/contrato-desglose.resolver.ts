import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { ContratoDesgloseService } from './contrato-desglose.service';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Resolver(() => ContratoDesglose)
export class ContratoDesgloseResolver {
  constructor(private readonly contratoDesgloseService: ContratoDesgloseService) {}

  @Mutation(() => ContratoDesglose)
  @UseGuards(new AuthGuard())
  createContratoDesglose(@Args('createContratoDesgloseInput') createContratoDesgloseInput: CreateContratoDesgloseInput) {
    return this.contratoDesgloseService.save(createContratoDesgloseInput);
  }

  @Query(() => [ContratoDesglose])
  @UseGuards(new AuthGuard())
  findAllContratoDesglose() {
    return this.contratoDesgloseService.findAll();
  }

  @Query(() => ContratoDesglose)
  @UseGuards(new AuthGuard())
  findOneContratoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.findOne(id);
  }

  @Mutation(() => ContratoDesglose)
  @UseGuards(new AuthGuard())
  removeContratoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.remove(id);
  }

  @Mutation(() => [ContratoDesglose])
  @UseGuards(new AuthGuard())
  removeSeveralContratoDesglose(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.contratoDesgloseService.removeSeveral(id);
  }

  @Mutation(() => [ContratoDesglose])
  @UseGuards(new AuthGuard())
  removeSeveralContratoDesgloseByEmbarqueId(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.removeSeveralByEmbarqueId(id);
  }
}
