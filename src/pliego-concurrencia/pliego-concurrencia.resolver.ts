import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PliegoConcurrenciaService } from './pliego-concurrencia.service';
import { CreatePliegoConcurrenciaInput } from './dto/create-pliego-concurrencia.input';
import { PliegoConcurrencia } from 'src/models/entities/PliegoConcurrencia.entity';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';

@Resolver(() => PliegoConcurrencia)
export class PliegoConcurrenciaResolver {
  constructor(private readonly pliegoConcurrenciaService: PliegoConcurrenciaService) {}

  @Mutation(() => PliegoConcurrencia)
  createPliegoConcurrencia(@Args('createPliegoConcurrenciaInput') createPliegoConcurrenciaInput: CreatePliegoConcurrenciaInput) {
    return this.pliegoConcurrenciaService.save(createPliegoConcurrenciaInput);
  }

  @Query(() => [PliegoConcurrencia])
  findAllPliegoConcurrencia() {
    return this.pliegoConcurrenciaService.findAll();
  }

  @Query(() => PliegoConcurrencia)
  findOnePliegoConcurrencia(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaService.findOne(id);
  }

  @Mutation(() => PliegoConcurrencia)
  removePliegoConcurrencia(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaService.remove(id);
  }

  @ResolveField(() => SolicitudOfertas, {nullable: true})
  oferta(@Parent() pliegoConcurrencia: PliegoConcurrencia): Promise<SolicitudOfertas> {
    return this.pliegoConcurrenciaService.getOferta(pliegoConcurrencia.idOferta);
  }
}