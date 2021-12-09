import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormasPagoService } from './formas-pago.service';
import { CreateFormasPagoInput } from './dto/create-formas-pago.input';
import { FormasPago } from 'src/models/entities/FormasPago.entity';

@Resolver(() => FormasPago)
export class FormasPagoResolver {
  constructor(private readonly formasPagoService: FormasPagoService) {}

  @Mutation(() => FormasPago)
  createFormasPago(@Args('createFormasPagoInput') createFormasPagoInput: CreateFormasPagoInput) {
    return this.formasPagoService.save(createFormasPagoInput);
  }

  @Query(() => [FormasPago])
  findAllFormasPago() {
    return this.formasPagoService.findAll();
  }

  @Query(() => FormasPago)
  findOneFormasPago(@Args('id', { type: () => Int }) id: number) {
    return this.formasPagoService.findOne(id);
  }

  @Mutation(() => FormasPago)
  removeFormasPago(@Args('id', { type: () => Int }) id: number) {
    return this.formasPagoService.remove(id);
  }
}
