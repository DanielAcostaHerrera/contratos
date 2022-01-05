import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { EmbarquesService } from './embarques.service';
import { CreateEmbarqueInput } from './dto/create-embarque.input';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';

@Resolver(() => Embarques)
export class EmbarquesResolver {
  constructor(private readonly embarquesService: EmbarquesService) {}

  @Mutation(() => Embarques)
  createEmbarque(@Args('createEmbarqueInput') createEmbarqueInput: CreateEmbarqueInput) {
    return this.embarquesService.save(createEmbarqueInput);
  }

  @Query(() => [Embarques])
  findAllEmbarques() {
    return this.embarquesService.findAll();
  }

  @Query(() => Embarques)
  findOneEmbarques(@Args('id', { type: () => Int }) id: number) {
    return this.embarquesService.findOne(id);
  }

  @Mutation(() => Embarques)
  removeEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.embarquesService.remove(id);
  }

  @Mutation(() => [Embarques])
  removeSeveralEmbarque(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.embarquesService.removeSeveral(id);
  }

  @ResolveField(() => Contratos, {nullable: true})
  contratos(@Parent() embarques: Embarques): Promise<Contratos> {
    return this.embarquesService.getContrato(embarques.idContrato);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivos(@Parent() embarques: Embarques): Promise<Ejecutivos> {
    return this.embarquesService.getEjecutivo(embarques.idEjecutivo);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoDestino(@Parent() embarques: Embarques): Promise<Puertos> {
    return this.embarquesService.getPuertoDestino(embarques.destino);
  }
}
