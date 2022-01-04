import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MonedaService } from './moneda.service';
import { CreateMonedaInput } from './dto/create-moneda.input';
import { Monedas } from '../models/entities/Monedas.entity';

@Resolver(() => Monedas)
export class MonedaResolver {
  constructor(private readonly monedaService: MonedaService) {}

  @Mutation(() => Monedas)
  createMoneda(@Args('createMonedaInput') createMonedaInput: CreateMonedaInput) {
    return this.monedaService.save(createMonedaInput);
  }

  @Query(() => [Monedas])
  findAllMoneda() {
    return this.monedaService.findAll();
  }

  @Query(() => Monedas)
  findOneMoneda(
    @Args('id', { type: () => Int }) id: number) {
    return this.monedaService.findOne(id);
  }

  @Mutation(() => Monedas)
  updateMoneda(@Args('updateMonedaInput') updateMonedaInput: CreateMonedaInput) {
    return this.monedaService.save(updateMonedaInput);
  }

  @Mutation(() => Monedas)
  removeMoneda(@Args('id', { type: () => Int }) id: number) {
    return this.monedaService.remove(id);
  }

  @Mutation(() => [Monedas])
  removeSeveralMoneda(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.monedaService.removeSeveral(id);
  }
}
