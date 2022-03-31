import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { DatosEntidad } from 'src/models/entities/DatosEntidad.entity';
import { DatosEntidadService } from './datos-entidad.service';
import { CreateDatosEntidadInput } from './dto/create-datos-entidad.input';

@Resolver(() => DatosEntidad)
export class DatosEntidadResolver {
  constructor(private readonly datosEntidadService: DatosEntidadService) {}

  @Mutation(() => DatosEntidad)
  @UseGuards(new AuthGuard())
  createDatosEntidad(@Args('createDatosEntidadInput') createDatosEntidadInput: CreateDatosEntidadInput) {
    return this.datosEntidadService.save(createDatosEntidadInput);
  }

  @Query(() => [DatosEntidad])
  @UseGuards(new AuthGuard())
  findAllDatosEntidad() {
    return this.datosEntidadService.findAll();
  }

  @Query(() => DatosEntidad)
  @UseGuards(new AuthGuard())
  findOneDatosEntidad(@Args('id', { type: () => Int }) id: number) {
    return this.datosEntidadService.findOne(id);
  }

  @Mutation(() => DatosEntidad)
  @UseGuards(new AuthGuard())
  removeDatosEntidad(@Args('id', { type: () => Int }) id: number) {
    return this.datosEntidadService.remove(id);
  }

  @Mutation(() => [DatosEntidad])
  @UseGuards(new AuthGuard())
  removeSeveralDatosEntidad(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.datosEntidadService.removeSeveral(id);
  }
}
