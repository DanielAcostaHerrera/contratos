import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PagosService } from './pagos.service';
import { CreatePagoInput } from './dto/create-pago.input';
import { Pagos } from 'src/models/entities/Pagos.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => Pagos)
export class PagosResolver {
  constructor(private readonly pagosService: PagosService) {}

  @Mutation(() => Pagos)
  createPago(@Args('createPagoInput') createPagoInput: CreatePagoInput) {
    return this.pagosService.save(createPagoInput);
  }

  @Query(() => [Pagos])
  findAllPagos() {
    return this.pagosService.findAll();
  }

  @Query(() => Pagos)
  findOnePagos(@Args('id', { type: () => Int }) id: number) {
    return this.pagosService.findOne(id);
  }

  @Mutation(() => Pagos)
  removePago(@Args('id', { type: () => Int }) id: number) {
    return this.pagosService.remove(id);
  }

  @Mutation(() => [Pagos])
  @UseGuards(new AuthGuard())
  removeSeveralPago(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.pagosService.removeSeveral(id);
  }
}
