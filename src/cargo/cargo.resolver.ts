import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Cargos } from 'src/models/entities/Cargos.entity';
import { CargoService } from './cargo.service';
import { CreateCargoInput } from './dto/create-cargo.input';

@Resolver(() => Cargos)
export class CargoResolver {
  constructor(private readonly cargoService: CargoService) {}

  @Mutation(() => Cargos)
  createCargo(@Args('createCargoInput') createCargoInput: CreateCargoInput) {
    return this.cargoService.save(createCargoInput);
  }

  @Query(() => [Cargos])
  findAllCargos() {
    return this.cargoService.findAll();
  }

  @Query(() => Cargos)
  findOneCargo(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.findOne(id);
  }

  @Mutation(() => Cargos)
  removeCargo(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.remove(id);
  }
}
