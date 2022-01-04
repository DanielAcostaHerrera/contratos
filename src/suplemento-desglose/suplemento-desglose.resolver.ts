import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoDesgloseService } from './suplemento-desglose.service';
import { CreateSuplementoDesgloseInput } from './dto/create-suplemento-desglose.input';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';

@Resolver(() => SuplementoDesglose)
export class SuplementoDesgloseResolver {
  constructor(private readonly suplementoDesgloseService: SuplementoDesgloseService) {}

  @Mutation(() => SuplementoDesglose)
  createSuplementoDesglose(@Args('createSuplementoDesgloseInput') createSuplementoDesgloseInput: CreateSuplementoDesgloseInput) {
    return this.suplementoDesgloseService.save(createSuplementoDesgloseInput);
  }

  @Query(() => [SuplementoDesglose])
  findAllSuplementoDesglose() {
    return this.suplementoDesgloseService.findAll();
  }

  @Query(() => SuplementoDesglose)
  findOneSuplementoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoDesgloseService.findOne(id);
  }

  @Mutation(() => SuplementoDesglose)
  removeSuplementoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoDesgloseService.remove(id);
  }

  @Mutation(() => [SuplementoDesglose])
  removeSeveralSuplementoDesglose(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoDesgloseService.removeSeveral(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoDesglose: SuplementoDesglose): Promise<SuplementoResumen> {
    return this.suplementoDesgloseService.getSuplementoResumen(suplementoDesglose.idSuplementoResumen);
  }

  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() suplementoDesglose: SuplementoDesglose): Promise<Embarques> {
    return this.suplementoDesgloseService.getEmbarque(suplementoDesglose.idEmbarque);
  }
}
