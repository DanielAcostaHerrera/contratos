import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Configuracion } from 'src/models/entities/Configuracion.entity';
import { ConfiguracionService } from './configuracion.service';
import { CreateConfiguracionInput } from './dto/create-configuracion.input';

@Resolver(() => Configuracion)
export class ConfiguracionResolver {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Mutation(() => Configuracion)
  createConfiguracion(@Args('createConfiguracionInput') createConfiguracionInput: CreateConfiguracionInput) {
    return this.configuracionService.save(createConfiguracionInput);
  }

  @Query(() => [Configuracion])
  findAllConfiguracion() {
    return this.configuracionService.findAll();
  }

  @Query(() => Configuracion)
  findOneConfiguracion(@Args('id', { type: () => Int }) id: number) {
    return this.configuracionService.findOne(id);
  }

  @Mutation(() => Configuracion)
  removeConfiguracion(@Args('id', { type: () => Int }) id: number) {
    return this.configuracionService.remove(id);
  }
}
