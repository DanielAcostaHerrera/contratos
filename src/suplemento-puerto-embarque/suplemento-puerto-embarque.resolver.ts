import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoPuertoEmbarqueService } from './suplemento-puerto-embarque.service';
import { CreateSuplementoPuertoEmbarqueInput } from './dto/create-suplemento-puerto-embarque.input';
import { SuplementoPuertoEmbarque } from 'src/models/entities/SuplementoPuertoEmbarque.entity';
import { AuthGuard } from 'src/auth.guard';
import { UseGuards } from '@nestjs/common';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';

@Resolver(() => SuplementoPuertoEmbarque)
export class SuplementoPuertoEmbarqueResolver {
  constructor(private readonly suplementoPuertoEmbarqueService: SuplementoPuertoEmbarqueService) {}

  @Mutation(() => SuplementoPuertoEmbarque)
  @UseGuards(new AuthGuard())
  createSuplementoPuertoEmbarque(@Args('createSuplementoPuertoEmbarqueInput') createSuplementoPuertoEmbarqueInput: CreateSuplementoPuertoEmbarqueInput) {
    return this.suplementoPuertoEmbarqueService.save(createSuplementoPuertoEmbarqueInput);
  }

  @Query(() => [SuplementoPuertoEmbarque])
  @UseGuards(new AuthGuard())
  findAllSuplementoPuertoEmbarque() {
    return this.suplementoPuertoEmbarqueService.findAll();
  }

  @Query(() => SuplementoPuertoEmbarque)
  @UseGuards(new AuthGuard())
  findOneSuplementoPuertoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoPuertoEmbarqueService.findOne(id);
  }

  @Mutation(() => SuplementoPuertoEmbarque)
  @UseGuards(new AuthGuard())
  removeSuplementoPuertoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoPuertoEmbarqueService.remove(id);
  }

  @Mutation(() => [SuplementoPuertoEmbarque])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoPuertoEmbarque(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoPuertoEmbarqueService.removeSeveral(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoPuertoEmbarque: SuplementoPuertoEmbarque): Promise<SuplementoResumen> {
    return this.suplementoPuertoEmbarqueService.getSuplementoResumen(suplementoPuertoEmbarque.idSuplementoResumen);
  }

  @ResolveField(() => Embarques, {nullable: true})
  embarque(@Parent() suplementoPuertoEmbarque: SuplementoPuertoEmbarque): Promise<Embarques> {
    return this.suplementoPuertoEmbarqueService.getEmbarque(suplementoPuertoEmbarque.idEmbarque);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoOrigen(@Parent() suplementoPuertoEmbarque: SuplementoPuertoEmbarque): Promise<Puertos> {
    return this.suplementoPuertoEmbarqueService.getPuerto(suplementoPuertoEmbarque.idPuertoOrigen);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoDestino(@Parent() suplementoPuertoEmbarque: SuplementoPuertoEmbarque): Promise<Puertos> {
    return this.suplementoPuertoEmbarqueService.getPuerto(suplementoPuertoEmbarque.idPuertoDestino);
  }
}
