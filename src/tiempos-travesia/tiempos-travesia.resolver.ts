import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { TiemposTravesiaService } from './tiempos-travesia.service';
import { CreateTiemposTravesiaInput } from './dto/create-tiempos-travesia.input';
import { TiemposTravesia } from 'src/models/entities/TiemposTravesia.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => TiemposTravesia)
export class TiemposTravesiaResolver {
  constructor(private readonly tiemposTravesiaService: TiemposTravesiaService) {}

  @Mutation(() => TiemposTravesia)
  @UseGuards(new AuthGuard())
  createTiemposTravesia(@Args('createTiemposTravesiaInput') createTiemposTravesiaInput: CreateTiemposTravesiaInput) {
    return this.tiemposTravesiaService.save(createTiemposTravesiaInput);
  }

  @Query(() => [TiemposTravesia])
  @UseGuards(new AuthGuard())
  findAllTiemposTravesia() {
    return this.tiemposTravesiaService.findAll();
  }

  @Query(() => TiemposTravesia)
  @UseGuards(new AuthGuard())
  findOneTiemposTravesia(@Args('id', { type: () => Int }) id: number) {
    return this.tiemposTravesiaService.findOne(id);
  }

  @Mutation(() => TiemposTravesia)
  @UseGuards(new AuthGuard())
  removeTiemposTravesia(@Args('id', { type: () => Int }) id: number) {
    return this.tiemposTravesiaService.remove(id);
  }

  @Mutation(() => [TiemposTravesia])
  @UseGuards(new AuthGuard())
  removeSeveralTiemposTravesia(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tiemposTravesiaService.removeSeveral(id);
  }
}
