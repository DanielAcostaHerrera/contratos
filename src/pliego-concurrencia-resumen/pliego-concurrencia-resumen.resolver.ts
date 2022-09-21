import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { PliegoConcurrenciaResumenService } from './pliego-concurrencia-resumen.service';
import { CreatePliegoConcurrenciaResumanInput } from './dto/create-pliego-concurrencia-resuman.input';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => PliegoConcurrenciaResumen)
export class PliegoConcurrenciaResumenResolver {
  constructor(private readonly pliegoConcurrenciaResumenService: PliegoConcurrenciaResumenService) {}

  @Mutation(() => PliegoConcurrenciaResumen)
  @UseGuards(new AuthGuard())
  createPliegoConcurrenciaResuman(@Args('createPliegoConcurrenciaResumanInput') createPliegoConcurrenciaResumanInput: CreatePliegoConcurrenciaResumanInput) {
    return this.pliegoConcurrenciaResumenService.save(createPliegoConcurrenciaResumanInput);
  }

  @Query(() => [PliegoConcurrenciaResumen])
  @UseGuards(new AuthGuard())
  findAllPliegoConcurrenciaResumen() {
    return this.pliegoConcurrenciaResumenService.findAll();
  }

  @Query(() => PliegoConcurrenciaResumen)
  @UseGuards(new AuthGuard())
  findOnePliegoConcurrenciaResumen(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaResumenService.findOne(id);
  }

  @Mutation(() => PliegoConcurrenciaResumen)
  @UseGuards(new AuthGuard())
  removePliegoConcurrenciaResuman(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaResumenService.remove(id);
  }

  @Mutation(() => [PliegoConcurrenciaResumen])
  @UseGuards(new AuthGuard())
  removeSeveralPliegoConcurrenciaResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.pliegoConcurrenciaResumenService.removeSeveral(id);
  }
}
