import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormasPagoService } from './formas-pago.service';
import { CreateFormasPagoInput } from './dto/create-formas-pago.input';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => FormasPago)
export class FormasPagoResolver {
  constructor(private readonly formasPagoService: FormasPagoService) {}

  @Mutation(() => FormasPago)
  @UseGuards(new AuthGuard())
  createFormasPago(@Args('createFormasPagoInput') createFormasPagoInput: CreateFormasPagoInput) {
    return this.formasPagoService.save(createFormasPagoInput);
  }

  @Query(() => [FormasPago])
  @UseGuards(new AuthGuard())
  findAllFormasPago() {
    return this.formasPagoService.findAll();
  }

  @Query(() => FormasPago)
  @UseGuards(new AuthGuard())
  findOneFormasPago(@Args('id', { type: () => Int }) id: number) {
    return this.formasPagoService.findOne(id);
  }

  @Mutation(() => FormasPago)
  @UseGuards(new AuthGuard())
  removeFormasPago(@Args('id', { type: () => Int }) id: number) {
    return this.formasPagoService.remove(id);
  }

  @Mutation(() => [FormasPago])
  @UseGuards(new AuthGuard())
  removeSeveralFormasPago(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.formasPagoService.removeSeveral(id);
  }
}
