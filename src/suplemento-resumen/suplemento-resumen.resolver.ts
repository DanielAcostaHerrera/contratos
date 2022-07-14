import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { SuplementoResumenService } from './suplemento-resumen.service';
import { CreateSuplementoResumanInput } from './dto/create-suplemento-resuman.input';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { AgenciasAseguradoras } from 'src/modelsNomgen/entities/AgenciasAseguradoras.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';

@Resolver(() => SuplementoResumen)
export class SuplementoResumenResolver {
  constructor(private readonly suplementoResumenService: SuplementoResumenService) {}

  @Mutation(() => SuplementoResumen)
  @UseGuards(new AuthGuard())
  createSuplementoResuman(@Args('createSuplementoResumanInput') createSuplementoResumanInput: CreateSuplementoResumanInput) {
    return this.suplementoResumenService.save(createSuplementoResumanInput);
  }

  @Query(() => [SuplementoResumen])
  @UseGuards(new AuthGuard())
  findAllSuplementoResumen() {
    return this.suplementoResumenService.findAll();
  }

  @Query(() => SuplementoResumen)
  @UseGuards(new AuthGuard())
  findOneSuplementoResumen(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoResumenService.findOne(id);
  }

  @Mutation(() => SuplementoResumen)
  @UseGuards(new AuthGuard())
  removeSuplementoResuman(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoResumenService.remove(id);
  }

  @Mutation(() => [SuplementoResumen])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoResumenService.removeSeveral(id);
  }

  @ResolveField(() => FormasEntrega, {nullable: true})
  formaEntrega(@Parent() suplementoResumen: SuplementoResumen): Promise<FormasEntrega> {
    return this.suplementoResumenService.getFormaEntrega(suplementoResumen.idFormaEntrega);
  }

  @ResolveField(() => Incoterm, {nullable: true})
  incoterm(@Parent() suplementoResumen: SuplementoResumen): Promise<Incoterm> {
    return this.suplementoResumenService.getIncoterm(suplementoResumen.idIncoterm);
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

  @ResolveField(() => AgenciasAseguradoras, {nullable: true})
  empresaAseguradora(@Parent() suplementoResumen: SuplementoResumen): Promise<AgenciasAseguradoras> {
    return this.suplementoResumenService.getEmpresaAseguradora(suplementoResumen.idEmpSeguro);
  }

  @ResolveField(() => CompaniasNavieras, {nullable: true})
  empresaNaviera(@Parent() suplementoResumen: SuplementoResumen): Promise<CompaniasNavieras> {
    return this.suplementoResumenService.getEmpresaNaviera(suplementoResumen.idEmpNaviera);
  }

  @ResolveField(() => NegociacionResumen, {nullable: true})
  negociacion(@Parent() suplementoResumen: SuplementoResumen): Promise<NegociacionResumen> {
    return this.suplementoResumenService.getNegociacion(suplementoResumen.idNegociacion);
  }
}
