import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FacturaDesgloseService } from './factura-desglose.service';
import { CreateFacturaDesgloseInput } from './dto/create-factura-desglose.input';
import { FacturaDesglose } from 'src/models/entities/FacturaDesglose.entity';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';

@Resolver(() => FacturaDesglose)
export class FacturaDesgloseResolver {
  constructor(private readonly facturaDesgloseService: FacturaDesgloseService) {}

  @Mutation(() => FacturaDesglose)
  createFacturaDesglose(@Args('createFacturaDesgloseInput') createFacturaDesgloseInput: CreateFacturaDesgloseInput) {
    return this.facturaDesgloseService.save(createFacturaDesgloseInput);
  }

  @Query(() => [FacturaDesglose])
  findAllFacturaDesglose() {
    return this.facturaDesgloseService.findAll();
  }

  @Query(() => FacturaDesglose)
  findOneFacturaDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.facturaDesgloseService.findOne(id);
  }

  @Mutation(() => FacturaDesglose)
  removeFacturaDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.facturaDesgloseService.remove(id);
  }

  @Mutation(() => [FacturaDesglose])
  removeSeveralFacturaDesglose(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.facturaDesgloseService.removeSeveral(id);
  }

  @ResolveField(() => FacturaResumen, {nullable: true})
  facturaResumen(@Parent() facturaDesglose: FacturaDesglose): Promise<FacturaResumen> {
    return this.facturaDesgloseService.getFacturaResumen(facturaDesglose.idFactura);
  }

  @ResolveField(() => CodigosParaLaVenta, {nullable: true})
  codigo(@Parent() facturaDesglose: FacturaDesglose): Promise<CodigosParaLaVenta> {
    return this.facturaDesgloseService.getCodigo(facturaDesglose.idCodigo);
  }

  @ResolveField(() => Referencias, {nullable: true})
  referencia(@Parent() facturaDesglose: FacturaDesglose): Promise<Referencias> {
    return this.facturaDesgloseService.getReferencia(facturaDesglose.idReferencia);
  }

  @ResolveField(() => Paises, {nullable: true})
  pais(@Parent() facturaDesglose: FacturaDesglose): Promise<Paises> {
    return this.facturaDesgloseService.getPais(facturaDesglose.idPaisOrigen);
  }
}
