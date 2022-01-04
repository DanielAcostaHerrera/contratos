import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoPagosService } from './suplemento-pagos.service';
import { CreateSuplementoPagoInput } from './dto/create-suplemento-pago.input';
import { SuplementoPagos } from 'src/models/entities/SuplementoPagos.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';

@Resolver(() => SuplementoPagos)
export class SuplementoPagosResolver {
  constructor(private readonly suplementoPagosService: SuplementoPagosService) {}

  @Mutation(() => SuplementoPagos)
  createSuplementoPago(@Args('createSuplementoPagoInput') createSuplementoPagoInput: CreateSuplementoPagoInput) {
    return this.suplementoPagosService.save(createSuplementoPagoInput);
  }

  @Query(() => [SuplementoPagos])
  findAllSuplementoPagos() {
    return this.suplementoPagosService.findAll();
  }

  @Query(() => SuplementoPagos)
  findOneSuplementoPagos(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoPagosService.findOne(id);
  }

  @Mutation(() => SuplementoPagos)
  removeSuplementoPago(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoPagosService.remove(id);
  }

  @Mutation(() => [SuplementoPagos])
  removeSeveralSuplementoPago(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoPagosService.removeSeveral(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoPagos: SuplementoPagos): Promise<SuplementoResumen> {
    return this.suplementoPagosService.getSuplementoResumen(suplementoPagos.idSuplementoResumen);
  }

  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() suplementoPagos: SuplementoPagos): Promise<Embarques> {
    return this.suplementoPagosService.getEmbarque(suplementoPagos.idEmbarque);
  }

  @ResolveField(() => FormasPago, {nullable: true})
  formasPago(@Parent() suplementoPagos: SuplementoPagos): Promise<FormasPago> {
    return this.suplementoPagosService.getFormaPago(suplementoPagos.idFormaPago);
  }
  
}
