import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Clasificaciones } from 'src/models/entities/Clasificaciones.entity';
import { ClasificacionesService } from './clasificaciones.service';
import { CreateClasificacioneInput } from './dto/create-clasificacione.input';

@Resolver(() => Clasificaciones)
export class ClasificacionesResolver {
  constructor(private readonly clasificacionesService: ClasificacionesService) {}

  @Mutation(() => Clasificaciones)
  createClasificaciones(@Args('createClasificacioneInput') createClasificacioneInput: CreateClasificacioneInput) {
    return this.clasificacionesService.save(createClasificacioneInput);
  }

  @Query(() => [Clasificaciones])
  findAllClasificaciones() {
    return this.clasificacionesService.findAll();
  }

  @Query(() => Clasificaciones)
  findOneClasificaciones(@Args('id', { type: () => Int }) id: number) {
    return this.clasificacionesService.findOne(id);
  }

  @Mutation(() => Clasificaciones)
  removeClasificacione(@Args('id', { type: () => Int }) id: number) {
    return this.clasificacionesService.remove(id);
  }
}
