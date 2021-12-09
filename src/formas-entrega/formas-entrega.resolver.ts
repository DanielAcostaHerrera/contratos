import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormasEntregaService } from './formas-entrega.service';
import { CreateFormasEntregaInput } from './dto/create-formas-entrega.input';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';

@Resolver(() => FormasEntrega)
export class FormasEntregaResolver {
  constructor(private readonly formasEntregaService: FormasEntregaService) {}

  @Mutation(() => FormasEntrega)
  createFormasEntrega(@Args('createFormasEntregaInput') createFormasEntregaInput: CreateFormasEntregaInput) {
    return this.formasEntregaService.save(createFormasEntregaInput);
  }

  @Query(() => [FormasEntrega])
  findAllFormasEntrega() {
    return this.formasEntregaService.findAll();
  }

  @Query(() => FormasEntrega)
  findOneFormasEntrega(@Args('id', { type: () => Int }) id: number) {
    return this.formasEntregaService.findOne(id);
  }

  @Mutation(() => FormasEntrega)
  removeFormasEntrega(@Args('id', { type: () => Int }) id: number) {
    return this.formasEntregaService.remove(id);
  }
}
