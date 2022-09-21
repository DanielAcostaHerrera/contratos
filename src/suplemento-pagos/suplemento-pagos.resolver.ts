import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { SuplementoPagosService } from './suplemento-pagos.service';
import { CreateSuplementoPagoInput } from './dto/create-suplemento-pago.input';
import { SuplementoPagos } from 'src/models/entities/SuplementoPagos.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SuplementoPagos)
export class SuplementoPagosResolver {
  constructor(private readonly suplementoPagosService: SuplementoPagosService) {}

  @Mutation(() => SuplementoPagos)
  @UseGuards(new AuthGuard())
  createSuplementoPago(@Args('createSuplementoPagoInput') createSuplementoPagoInput: CreateSuplementoPagoInput) {
    return this.suplementoPagosService.save(createSuplementoPagoInput);
  }

  @Query(() => [SuplementoPagos])
  @UseGuards(new AuthGuard())
  findAllSuplementoPagos() {
    return this.suplementoPagosService.findAll();
  }

  @Query(() => SuplementoPagos)
  @UseGuards(new AuthGuard())
  findOneSuplementoPagos(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoPagosService.findOne(id);
  }

  @Mutation(() => SuplementoPagos)
  @UseGuards(new AuthGuard())
  removeSuplementoPago(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoPagosService.remove(id);
  }

  @Mutation(() => [SuplementoPagos])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoPago(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoPagosService.removeSeveral(id);
  }
}
