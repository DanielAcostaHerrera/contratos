import { FichaCostoResumen } from './../models/entities/FichaCostoResumen.entity';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FichaCostoResumenService } from './ficha-costo-resumen.service';
import { CreateFichaCostoResumenInput } from './dto/create-ficha-costo-resuman.input';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Embalajes } from 'src/models/entities/Embalajes.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { ContratoMarco } from 'src/models/entities/ContratoMarco.entity';

@Resolver(() => FichaCostoResumen)
export class FichaCostoResumenResolver {
  constructor(private readonly fichaCostoResumenService: FichaCostoResumenService) {}

  @Mutation(() => FichaCostoResumen)
  @UseGuards(new AuthGuard())
  createFichaCostoResuman(@Args('createFichaCostoResumanInput') createFichaCostoResumanInput: CreateFichaCostoResumenInput) {
    return this.fichaCostoResumenService.save(createFichaCostoResumanInput);
  }

  @Query(() => [FichaCostoResumen])
  @UseGuards(new AuthGuard())
  findAllFichaCostoResumen() {
    return this.fichaCostoResumenService.findAll();
  }

  @Query(() => FichaCostoResumen)
  @UseGuards(new AuthGuard())
  findOneFichaCostoResumen(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCostoResumenService.findOne(id);
  }

  @Mutation(() => FichaCostoResumen)
  @UseGuards(new AuthGuard())
  removeFichaCostoResuman(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCostoResumenService.remove(id);
  }

  @Mutation(() => [FichaCostoResumen])
  @UseGuards(new AuthGuard())
  removeSeveralFichaCostoResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.fichaCostoResumenService.removeSeveral(id);
  }

  @ResolveField(() => ContratoMarco, {nullable: true})
  baseCMarco(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<ContratoMarco> {
    return this.fichaCostoResumenService.getCMarco(fichaCostoResumen.idCMarco);
  }
  
  @ResolveField(() => Monedas, {nullable: true})
  moneda(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<Monedas> {
    return this.fichaCostoResumenService.getMoneda(fichaCostoResumen.idMoneda);
  }

  @ResolveField(() => FormasPago, {nullable: true})
  formaPago(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<FormasPago> {
    return this.fichaCostoResumenService.getFormaPago(fichaCostoResumen.idFormaPago);
  }

  @ResolveField(() => Incoterm, {nullable: true})
  incoterm(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<Incoterm> {
    return this.fichaCostoResumenService.getIncoterm(fichaCostoResumen.idIncoterm);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puerto(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<Puertos> {
    return this.fichaCostoResumenService.getPuerto(fichaCostoResumen.idPuerto);
  }

  @ResolveField(() => Embalajes, {nullable: true})
  embalaje(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<Embalajes> {
    return this.fichaCostoResumenService.getEmbalaje(fichaCostoResumen.idEmbalaje);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  proveedor(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<Proveedores> {
    return this.fichaCostoResumenService.getProveedor(fichaCostoResumen.idProveedor);
  }

  @ResolveField(() => Paises, {nullable: true})
  pais(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<Paises> {
    return this.fichaCostoResumenService.getPais(fichaCostoResumen.idPais);
  }

  @ResolveField(() => CodigosParaLaVenta, {nullable: true})
  codigo(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<CodigosParaLaVenta> {
    return this.fichaCostoResumenService.getCodigo(fichaCostoResumen.idCodigo);
  }
}
