import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Clasificaciones } from 'src/models/entities/Clasificaciones.entity';
import { ClasificacionesService } from './clasificaciones.service';
import { CreateClasificacioneInput } from './dto/create-clasificacione.input';

@Resolver(() => Clasificaciones)
export class ClasificacionesResolver {
  constructor(private readonly clasificacionesService: ClasificacionesService) {}

  @Mutation(() => Clasificaciones)
  @UseGuards(new AuthGuard())
  createClasificaciones(@Args('createClasificacioneInput') createClasificacioneInput: CreateClasificacioneInput) {
    return this.clasificacionesService.save(createClasificacioneInput);
  }

  @Query(() => [Clasificaciones])
  @UseGuards(new AuthGuard())
  findAllClasificaciones() {
    return this.clasificacionesService.findAll();
  }

  @Query(() => Clasificaciones)
  @UseGuards(new AuthGuard())
  findOneClasificaciones(@Args('id', { type: () => Int }) id: number) {
    return this.clasificacionesService.findOne(id);
  }

  @Mutation(() => Clasificaciones)
  @UseGuards(new AuthGuard())
  removeClasificaciones(@Args('id', { type: () => Int }) id: number) {
    return this.clasificacionesService.remove(id);
  }

  @Mutation(() => [Clasificaciones])
  @UseGuards(new AuthGuard())
  removeSeveralClasificaciones(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.clasificacionesService.removeSeveral(id);
  }
}
