import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Configuracion } from 'src/models/entities/Configuracion.entity';
import { ConfiguracionService } from './configuracion.service';
import { CreateConfiguracionInput } from './dto/create-configuracion.input';

@Resolver(() => Configuracion)
export class ConfiguracionResolver {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Mutation(() => Configuracion)
  @UseGuards(new AuthGuard())
  createConfiguracion(@Args('createConfiguracionInput') createConfiguracionInput: CreateConfiguracionInput) {
    return this.configuracionService.save(createConfiguracionInput);
  }

  @Query(() => [Configuracion])
  @UseGuards(new AuthGuard())
  findAllConfiguracion() {
    return this.configuracionService.findAll();
  }

  @Query(() => Configuracion)
  @UseGuards(new AuthGuard())
  findOneConfiguracion(@Args('id', { type: () => Int }) id: number) {
    return this.configuracionService.findOne(id);
  }

  @Mutation(() => Configuracion)
  @UseGuards(new AuthGuard())
  removeConfiguracion(@Args('id', { type: () => Int }) id: number) {
    return this.configuracionService.remove(id);
  }

  @Mutation(() => [Configuracion])
  @UseGuards(new AuthGuard())
  removeSeveralConfiguracion(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.configuracionService.removeSeveral(id);
  }
}
