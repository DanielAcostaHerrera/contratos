import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormasEntregaService } from './formas-entrega.service';
import { CreateFormasEntregaInput } from './dto/create-formas-entrega.input';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => FormasEntrega)
export class FormasEntregaResolver {
  constructor(private readonly formasEntregaService: FormasEntregaService) {}

  @Mutation(() => FormasEntrega)
  @UseGuards(new AuthGuard())
  createFormasEntrega(@Args('createFormasEntregaInput') createFormasEntregaInput: CreateFormasEntregaInput) {
    return this.formasEntregaService.save(createFormasEntregaInput);
  }

  @Query(() => [FormasEntrega])
  @UseGuards(new AuthGuard())
  findAllFormasEntrega() {
    return this.formasEntregaService.findAll();
  }

  @Query(() => FormasEntrega)
  @UseGuards(new AuthGuard())
  findOneFormasEntrega(@Args('id', { type: () => Int }) id: number) {
    return this.formasEntregaService.findOne(id);
  }

  @Mutation(() => FormasEntrega)
  @UseGuards(new AuthGuard())
  removeFormasEntrega(@Args('id', { type: () => Int }) id: number) {
    return this.formasEntregaService.remove(id);
  }

  @Mutation(() => [FormasEntrega])
  @UseGuards(new AuthGuard())
  removeSeveralFormasEntrega(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.formasEntregaService.removeSeveral(id);
  }
}
