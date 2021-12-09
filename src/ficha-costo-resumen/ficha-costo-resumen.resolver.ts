import { FichaCostoResumen } from './../models/entities/FichaCostoResumen.entity';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FichaCostoResumenService } from './ficha-costo-resumen.service';
import { CreateFichaCostoResumenInput } from './dto/create-ficha-costo-resuman.input';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Embalajes } from 'src/models/entities/Embalajes.entity';

@Resolver(() => FichaCostoResumen)
export class FichaCostoResumenResolver {
  constructor(private readonly fichaCostoResumenService: FichaCostoResumenService) {}

  @Mutation(() => FichaCostoResumen)
  createFichaCostoResuman(@Args('createFichaCostoResumanInput') createFichaCostoResumanInput: CreateFichaCostoResumenInput) {
    return this.fichaCostoResumenService.save(createFichaCostoResumanInput);
  }

  @Query(() => [FichaCostoResumen])
  findAllFichaCostoResumen() {
    return this.fichaCostoResumenService.findAll();
  }

  @Query(() => FichaCostoResumen)
  findOneFichaCostoResumen(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCostoResumenService.findOne(id);
  }

  @Mutation(() => FichaCostoResumen)
  removeFichaCostoResuman(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCostoResumenService.remove(id);
  }

  @ResolveField(() => BasesCMarco, {nullable: true})
  baseCMarco(@Parent() fichaCostoResumen: FichaCostoResumen): Promise<BasesCMarco> {
    return this.fichaCostoResumenService.getBaseCMarco(fichaCostoResumen.idBaseCMarco);
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
}
