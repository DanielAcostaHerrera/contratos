import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoEmbarquesService } from './suplemento-embarques.service';
import { CreateSuplementoEmbarqueInput } from './dto/create-suplemento-embarque.input';
import { SuplementoEmbarques } from 'src/models/entities/SuplementoEmbarques.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';

@Resolver(() => SuplementoEmbarques)
export class SuplementoEmbarquesResolver {
  constructor(private readonly suplementoEmbarquesService: SuplementoEmbarquesService) {}

  @Mutation(() => SuplementoEmbarques)
  createSuplementoEmbarque(@Args('createSuplementoEmbarqueInput') createSuplementoEmbarqueInput: CreateSuplementoEmbarqueInput) {
    return this.suplementoEmbarquesService.save(createSuplementoEmbarqueInput);
  }

  @Query(() => [SuplementoEmbarques])
  findAllSuplementoEmbarques() {
    return this.suplementoEmbarquesService.findAll();
  }

  @Query(() => SuplementoEmbarques)
  findOneSuplementoEmbarques(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoEmbarquesService.findOne(id);
  }

  @Mutation(() => SuplementoEmbarques)
  removeSuplementoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoEmbarquesService.remove(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoEmbarques: SuplementoEmbarques): Promise<SuplementoResumen> {
    return this.suplementoEmbarquesService.getSuplementoResumen(suplementoEmbarques.idSuplementoResumen);
  }

  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() suplementoEmbarques: SuplementoEmbarques): Promise<Embarques> {
    return this.suplementoEmbarquesService.getEmbarque(suplementoEmbarques.idEmbarque);
  }

  @ResolveField(() => Contratos, {nullable: true})
  contrato(@Parent() suplementoEmbarques: SuplementoEmbarques): Promise<Contratos> {
    return this.suplementoEmbarquesService.getContrato(suplementoEmbarques.idContrato);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoDestino(@Parent() suplementoEmbarques: SuplementoEmbarques): Promise<Puertos> {
    return this.suplementoEmbarquesService.getPuertoDestino(suplementoEmbarques.idPuertoDestino);
  }
}
