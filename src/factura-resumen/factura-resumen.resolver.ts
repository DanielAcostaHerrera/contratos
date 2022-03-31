import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FacturaResumenService } from './factura-resumen.service';
import { CreateFacturaResumanInput } from './dto/create-factura-resuman.input';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => FacturaResumen)
export class FacturaResumenResolver {
  constructor(private readonly facturaResumenService: FacturaResumenService) {}

  @Mutation(() => FacturaResumen)
  @UseGuards(new AuthGuard())
  createFacturaResuman(@Args('createFacturaResumanInput') createFacturaResumanInput: CreateFacturaResumanInput) {
    return this.facturaResumenService.save(createFacturaResumanInput);
  }

  @Query(() => [FacturaResumen])
  @UseGuards(new AuthGuard())
  findAllFacturaResumen() {
    return this.facturaResumenService.findAll();
  }

  @Query(() => FacturaResumen)
  @UseGuards(new AuthGuard())
  findOneFacturaResumen(@Args('id', { type: () => Int }) id: number) {
    return this.facturaResumenService.findOne(id);
  }

  @Mutation(() => FacturaResumen)
  @UseGuards(new AuthGuard())
  removeFacturaResuman(@Args('id', { type: () => Int }) id: number) {
    return this.facturaResumenService.remove(id);
  }

  @Mutation(() => [FacturaResumen])
  @UseGuards(new AuthGuard())
  removeSeveralFacturaResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.facturaResumenService.removeSeveral(id);
  }

  @ResolveField(() => Contratos, {nullable: true})
  contratos(@Parent() facturaResumen: FacturaResumen): Promise<Contratos> {
    return this.facturaResumenService.getContrato(facturaResumen.idContrato);
  }

  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() facturaResumen: FacturaResumen): Promise<Embarques> {
    return this.facturaResumenService.getEmbarque(facturaResumen.idEmbarque);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivos(@Parent() facturaResumen: FacturaResumen): Promise<Ejecutivos> {
    return this.facturaResumenService.getEjecutivo(facturaResumen.idEjecutivo);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivoRealiza(@Parent() facturaResumen: FacturaResumen): Promise<Ejecutivos> {
    return this.facturaResumenService.getEjecutivoRealiza(facturaResumen.realizadoPor);
  }

  @ResolveField(() => NegociacionResumen, {nullable: true})
  negociacionResumen(@Parent() facturaResumen: FacturaResumen): Promise<NegociacionResumen> {
    return this.facturaResumenService.getNegociacionResumen(facturaResumen.idNegociacion);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoDestino(@Parent() facturaResumen: FacturaResumen): Promise<Puertos> {
    return this.facturaResumenService.getPuertoDestino(facturaResumen.idPuertoDestino);
  }
}
