import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SolicitudContratacionService } from './solicitud-contratacion.service';
import { CreateSolicitudContratacionInput } from './dto/create-solicitud-contratacion.input';
import { SolicitudContratacion } from 'src/models/entities/SolicitudContratacion.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';

@Resolver(() => SolicitudContratacion)
export class SolicitudContratacionResolver {
  constructor(private readonly solicitudContratacionService: SolicitudContratacionService) {}

  @Mutation(() => SolicitudContratacion)
  createSolicitudContratacion(@Args('createSolicitudContratacionInput') createSolicitudContratacionInput: CreateSolicitudContratacionInput) {
    return this.solicitudContratacionService.save(createSolicitudContratacionInput);
  }

  @Query(() => [SolicitudContratacion])
  findAllSolicitudContratacion() {
    return this.solicitudContratacionService.findAll();
  }

  @Query(() => SolicitudContratacion)
  findOneSolicitudContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudContratacionService.findOne(id);
  }

  @Mutation(() => SolicitudContratacion)
  removeSolicitudContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudContratacionService.remove(id);
  }

  @ResolveField(() => NegociacionResumen, {nullable: true})
  negociacion(@Parent() solicitudContratacion: SolicitudContratacion): Promise<NegociacionResumen> {
    return this.solicitudContratacionService.getNegociacionResumen(solicitudContratacion.idNegociacion);
  }

  @ResolveField(() => Compradores, {nullable: true})
  comprador(@Parent() solicitudContratacion: SolicitudContratacion): Promise<Compradores> {
    return this.solicitudContratacionService.getCompradores(solicitudContratacion.idComprador);
  }
}
