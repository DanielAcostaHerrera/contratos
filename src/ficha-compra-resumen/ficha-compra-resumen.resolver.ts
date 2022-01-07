import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FichaCompraResumenService } from './ficha-compra-resumen.service';
import { CreateFichaCompraResumanInput } from './dto/create-ficha-compra-resuman.input';
import { FichaCompraResumen } from 'src/models/entities/FichaCompraResumen.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';

@Resolver(() => FichaCompraResumen)
export class FichaCompraResumenResolver {
  constructor(private readonly fichaCompraResumenService: FichaCompraResumenService) {}

  @Mutation(() => FichaCompraResumen)
  createFichaCompraResuman(@Args('createFichaCompraResumanInput') createFichaCompraResumanInput: CreateFichaCompraResumanInput) {
    return this.fichaCompraResumenService.save(createFichaCompraResumanInput);
  }

  @Query(() => [FichaCompraResumen])
  findAllFichaCompraResumen() {
    return this.fichaCompraResumenService.findAll();
  }

  @Query(() => FichaCompraResumen)
  findOneFichaCompraResumen(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraResumenService.findOne(id);
  }

  @Mutation(() => FichaCompraResumen)
  removeFichaCompraResuman(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraResumenService.remove(id);
  }

  @Mutation(() => [FichaCompraResumen])
  removeSeveralFichaCompraResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.fichaCompraResumenService.removeSeveral(id);
  }

  @ResolveField(() => Monedas, {nullable: true})
  moneda(@Parent() fichaCompraResumen: FichaCompraResumen): Promise<Monedas> {
    return this.fichaCompraResumenService.getMoneda(fichaCompraResumen.idMoneda);
  }

  @ResolveField(() => Incoterm, {nullable: true})
  incoterm(@Parent() fichaCompraResumen: FichaCompraResumen): Promise<Incoterm> {
    return this.fichaCompraResumenService.getIncoterm(fichaCompraResumen.idIncoterm);
  }

  @ResolveField(() => Contratos, {nullable: true})
  contrato(@Parent() fichaCompraResumen: FichaCompraResumen): Promise<Contratos> {
    return this.fichaCompraResumenService.getContrato(fichaCompraResumen.idContrato);
  }

  @ResolveField(() => NegociacionResumen, {nullable: true})
  negociacionResumen(@Parent() fichaCompraResumen: FichaCompraResumen): Promise<NegociacionResumen> {
    return this.fichaCompraResumenService.getNegociacionResumen(fichaCompraResumen.idNegociacion);
  }

  @ResolveField(() => Paises, {nullable: true})
  pais(@Parent() fichaCompraResumen: FichaCompraResumen): Promise<Paises> {
    return this.fichaCompraResumenService.getPais(fichaCompraResumen.idPais);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  proveedor(@Parent() fichaCompraResumen: FichaCompraResumen): Promise<Proveedores> {
    return this.fichaCompraResumenService.getProveedor(fichaCompraResumen.idProveedor);
  }
}
