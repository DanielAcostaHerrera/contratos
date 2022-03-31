import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MonedaService } from './moneda.service';
import { CreateMonedaInput } from './dto/create-moneda.input';
import { Monedas } from '../models/entities/Monedas.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => Monedas)
export class MonedaResolver {
  constructor(private readonly monedaService: MonedaService) {}

  @Mutation(() => Monedas)
  @UseGuards(new AuthGuard())
  createMoneda(@Args('createMonedaInput') createMonedaInput: CreateMonedaInput) {
    return this.monedaService.save(createMonedaInput);
  }

  @Query(() => [Monedas])
  @UseGuards(new AuthGuard())
  findAllMoneda() {
    return this.monedaService.findAll();
  }

  @Query(() => Monedas)
  @UseGuards(new AuthGuard())
  findOneMoneda(
    @Args('id', { type: () => Int }) id: number) {
    return this.monedaService.findOne(id);
  }

  @Mutation(() => Monedas)
  @UseGuards(new AuthGuard())
  updateMoneda(@Args('updateMonedaInput') updateMonedaInput: CreateMonedaInput) {
    return this.monedaService.save(updateMonedaInput);
  }

  @Mutation(() => Monedas)
  @UseGuards(new AuthGuard())
  removeMoneda(@Args('id', { type: () => Int }) id: number) {
    return this.monedaService.remove(id);
  }

  @Mutation(() => [Monedas])
  @UseGuards(new AuthGuard())
  removeSeveralMoneda(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.monedaService.removeSeveral(id);
  }
}
