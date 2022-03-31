import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Cargos } from 'src/models/entities/Cargos.entity';
import { CargoService } from './cargo.service';
import { CreateCargoInput } from './dto/create-cargo.input';

@Resolver(() => Cargos)
export class CargoResolver {
  constructor(private readonly cargoService: CargoService) {}

  @Mutation(() => Cargos)
  @UseGuards(new AuthGuard())
  createCargo(@Args('createCargoInput') createCargoInput: CreateCargoInput) {
    return this.cargoService.save(createCargoInput);
  }

  @Query(() => [Cargos])
  @UseGuards(new AuthGuard())
  findAllCargos() {
    return this.cargoService.findAll();
  }

  @Query(() => Cargos)
  @UseGuards(new AuthGuard())
  findOneCargo(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.findOne(id);
  }

  @Mutation(() => Cargos)
  @UseGuards(new AuthGuard())
  removeCargo(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.remove(id);
  }

  @Mutation(() => [Cargos])
  @UseGuards(new AuthGuard())
  removeSeveralCargo(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.cargoService.removeSeveral(id);
  }
}
