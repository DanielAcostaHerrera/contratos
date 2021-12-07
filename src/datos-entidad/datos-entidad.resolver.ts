import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DatosEntidad } from 'src/models/entities/DatosEntidad.entity';
import { DatosEntidadService } from './datos-entidad.service';
import { CreateDatosEntidadInput } from './dto/create-datos-entidad.input';

@Resolver(() => DatosEntidad)
export class DatosEntidadResolver {
  constructor(private readonly datosEntidadService: DatosEntidadService) {}

  @Mutation(() => DatosEntidad)
  createDatosEntidad(@Args('createDatosEntidadInput') createDatosEntidadInput: CreateDatosEntidadInput) {
    return this.datosEntidadService.save(createDatosEntidadInput);
  }

  @Query(() => [DatosEntidad])
  findAllDatosEntidad() {
    return this.datosEntidadService.findAll();
  }

  @Query(() => DatosEntidad)
  findOneDatosEntidad(@Args('id', { type: () => Int }) id: number) {
    return this.datosEntidadService.findOne(id);
  }

  @Mutation(() => DatosEntidad)
  removeDatosEntidad(@Args('id', { type: () => Int }) id: number) {
    return this.datosEntidadService.remove(id);
  }
}
