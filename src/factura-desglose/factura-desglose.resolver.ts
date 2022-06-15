import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FacturaDesgloseService } from './factura-desglose.service';
import { CreateFacturaDesgloseInput } from './dto/create-factura-desglose.input';
import { FacturaDesglose } from 'src/models/entities/FacturaDesglose.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => FacturaDesglose)
export class FacturaDesgloseResolver {
  constructor(private readonly facturaDesgloseService: FacturaDesgloseService) {}

  @Mutation(() => FacturaDesglose)
  @UseGuards(new AuthGuard())
  createFacturaDesglose(@Args('createFacturaDesgloseInput') createFacturaDesgloseInput: CreateFacturaDesgloseInput) {
    return this.facturaDesgloseService.save(createFacturaDesgloseInput);
  }

  @Query(() => [FacturaDesglose])
  @UseGuards(new AuthGuard())
  findAllFacturaDesglose() {
    return this.facturaDesgloseService.findAll();
  }

  @Query(() => FacturaDesglose)
  @UseGuards(new AuthGuard())
  findOneFacturaDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.facturaDesgloseService.findOne(id);
  }

  @Mutation(() => FacturaDesglose)
  @UseGuards(new AuthGuard())
  removeFacturaDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.facturaDesgloseService.remove(id);
  }

  @Mutation(() => [FacturaDesglose])
  @UseGuards(new AuthGuard())
  removeSeveralFacturaDesglose(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.facturaDesgloseService.removeSeveral(id);
  }

  @Mutation(() => [FacturaDesglose])
  @UseGuards(new AuthGuard())
  removeSeveralFacturaDesgloseByFacturaId(@Args('id', { type: () => Int }) id: number) {
    return this.facturaDesgloseService.removeSeveralByFacturaId(id);
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
