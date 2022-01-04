import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { TiemposTravesiaService } from './tiempos-travesia.service';
import { CreateTiemposTravesiaInput } from './dto/create-tiempos-travesia.input';
import { TiemposTravesia } from 'src/models/entities/TiemposTravesia.entity';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';

@Resolver(() => TiemposTravesia)
export class TiemposTravesiaResolver {
  constructor(private readonly tiemposTravesiaService: TiemposTravesiaService) {}

  @Mutation(() => TiemposTravesia)
  createTiemposTravesia(@Args('createTiemposTravesiaInput') createTiemposTravesiaInput: CreateTiemposTravesiaInput) {
    return this.tiemposTravesiaService.save(createTiemposTravesiaInput);
  }

  @Query(() => [TiemposTravesia])
  findAllTiemposTravesia() {
    return this.tiemposTravesiaService.findAll();
  }

  @Query(() => TiemposTravesia)
  findOneTiemposTravesia(@Args('id', { type: () => Int }) id: number) {
    return this.tiemposTravesiaService.findOne(id);
  }

  @Mutation(() => TiemposTravesia)
  removeTiemposTravesia(@Args('id', { type: () => Int }) id: number) {
    return this.tiemposTravesiaService.remove(id);
  }

  @Mutation(() => [TiemposTravesia])
  removeSeveralTiemposTravesia(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tiemposTravesiaService.removeSeveral(id);
  }

  @ResolveField(() => EtapasContratacion, {nullable: true})
  etapaContratacion(@Parent() tiemposTravesia: TiemposTravesia): Promise<EtapasContratacion> {
    return this.tiemposTravesiaService.getEtapasContratacion(tiemposTravesia.idEtapa);
  }
}
