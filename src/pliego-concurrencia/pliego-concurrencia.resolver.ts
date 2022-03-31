import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PliegoConcurrenciaService } from './pliego-concurrencia.service';
import { CreatePliegoConcurrenciaInput } from './dto/create-pliego-concurrencia.input';
import { PliegoConcurrencia } from 'src/models/entities/PliegoConcurrencia.entity';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => PliegoConcurrencia)
export class PliegoConcurrenciaResolver {
  constructor(private readonly pliegoConcurrenciaService: PliegoConcurrenciaService) {}

  @Mutation(() => PliegoConcurrencia)
  @UseGuards(new AuthGuard())
  createPliegoConcurrencia(@Args('createPliegoConcurrenciaInput') createPliegoConcurrenciaInput: CreatePliegoConcurrenciaInput) {
    return this.pliegoConcurrenciaService.save(createPliegoConcurrenciaInput);
  }

  @Query(() => [PliegoConcurrencia])
  @UseGuards(new AuthGuard())
  findAllPliegoConcurrencia() {
    return this.pliegoConcurrenciaService.findAll();
  }

  @Query(() => PliegoConcurrencia)
  @UseGuards(new AuthGuard())
  findOnePliegoConcurrencia(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaService.findOne(id);
  }

  @Mutation(() => PliegoConcurrencia)
  @UseGuards(new AuthGuard())
  removePliegoConcurrencia(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaService.remove(id);
  }

  @Mutation(() => [PliegoConcurrencia])
  @UseGuards(new AuthGuard())
  removeSeveralPliegoConcurrencia(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.pliegoConcurrenciaService.removeSeveral(id);
  }

  @ResolveField(() => SolicitudOfertas, {nullable: true})
  oferta(@Parent() pliegoConcurrencia: PliegoConcurrencia): Promise<SolicitudOfertas> {
    return this.pliegoConcurrenciaService.getOferta(pliegoConcurrencia.idOferta);
  }
}
