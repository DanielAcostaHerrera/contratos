import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { SuplementoResumenService } from './suplemento-resumen.service';
import { CreateSuplementoResumanInput } from './dto/create-suplemento-resuman.input';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';

@Resolver(() => SuplementoResumen)
export class SuplementoResumenResolver {
  constructor(private readonly suplementoResumenService: SuplementoResumenService) {}

  @Mutation(() => SuplementoResumen)
  createSuplementoResuman(@Args('createSuplementoResumanInput') createSuplementoResumanInput: CreateSuplementoResumanInput) {
    return this.suplementoResumenService.save(createSuplementoResumanInput);
  }

  @Query(() => [SuplementoResumen])
  findAllSuplementoResumen() {
    return this.suplementoResumenService.findAll();
  }

  @Query(() => SuplementoResumen)
  findOneSuplementoResumen(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoResumenService.findOne(id);
  }

  @Mutation(() => SuplementoResumen)
  removeSuplementoResuman(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoResumenService.remove(id);
  }

  @Mutation(() => [SuplementoResumen])
  removeSeveralSuplementoResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoResumenService.removeSeveral(id);
  }

  @ResolveField(() => Contratos, {nullable: true})
  contrato(@Parent() suplementoResumen: SuplementoResumen): Promise<Contratos> {
    return this.suplementoResumenService.getContrato(suplementoResumen.idContrato);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoOrigen(@Parent() suplementoResumen: SuplementoResumen): Promise<Puertos> {
    return this.suplementoResumenService.getPuertoOrigen(suplementoResumen.idPuertoOrigen);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoDestino(@Parent() suplementoResumen: SuplementoResumen): Promise<Puertos> {
    return this.suplementoResumenService.getPuertoDestino(suplementoResumen.idPuertoDestino);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivoSuplementa(@Parent() suplementoResumen: SuplementoResumen): Promise<Ejecutivos> {
    return this.suplementoResumenService.getEjecutivoSuplementa(suplementoResumen.suplementadoPor);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivo(@Parent() suplementoResumen: SuplementoResumen): Promise<Ejecutivos> {
    return this.suplementoResumenService.getEjecutivo(suplementoResumen.idEjecutivo);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivoFirma(@Parent() suplementoResumen: SuplementoResumen): Promise<Ejecutivos> {
    return this.suplementoResumenService.getEjecutivoFirma(suplementoResumen.firma);
  }

  @ResolveField(() => Monedas, {nullable: true})
  moneda(@Parent() suplementoResumen: SuplementoResumen): Promise<Monedas> {
    return this.suplementoResumenService.getMoneda(suplementoResumen.idMoneda);
  }
}
