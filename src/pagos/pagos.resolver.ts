import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PagosService } from './pagos.service';
import { CreatePagoInput } from './dto/create-pago.input';
import { Pagos } from 'src/models/entities/Pagos.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { PagosAPartirDe } from 'src/models/entities/PagosAPartirDe.entity';

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

  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() pagos: Pagos): Promise<Embarques> {
    return this.pagosService.getEmbarque(pagos.idEmbarque);
  }

  @ResolveField(() => FormasPago, {nullable: true})
  formaPago(@Parent() pagos: Pagos): Promise<FormasPago> {
    return this.pagosService.getFormaPago(pagos.idFormaPago);
  }

  @ResolveField(() => PagosAPartirDe, {nullable: true})
  pagoAPartirDe(@Parent() pagos: Pagos): Promise<PagosAPartirDe> {
    return this.pagosService.getPagoAPartirDe(pagos.idPagosAPartirDe);
  }
}
