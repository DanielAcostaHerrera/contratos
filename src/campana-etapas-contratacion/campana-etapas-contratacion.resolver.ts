import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CampanaEtapasContratacion } from 'src/models/entities/CampanaEtapasContratacion.entity';
import { Campanas } from 'src/models/entities/Campanas.entity';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';
import { CampanaEtapasContratacionService } from './campana-etapas-contratacion.service';
import { CreateCampanaEtapasContratacionInput } from './dto/create-campana-etapas-contratacion.input';

@Resolver(() => CampanaEtapasContratacion)
export class CampanaEtapasContratacionResolver {
  constructor(private readonly campanaEtapasContratacionService: CampanaEtapasContratacionService) {}

  @Mutation(() => CampanaEtapasContratacion)
  createCampanaEtapasContratacion(@Args('createCampanaEtapasContratacionInput') createCampanaEtapasContratacionInput: CreateCampanaEtapasContratacionInput) {
    return this.campanaEtapasContratacionService.save(createCampanaEtapasContratacionInput);
  }

  @Query(() => [CampanaEtapasContratacion])
  findAllCampanaEtapasContratacion() {
    return this.campanaEtapasContratacionService.findAll();
  }

  @Query(() => CampanaEtapasContratacion)
  findOneCampanaEtapasContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.campanaEtapasContratacionService.findOne(id);
  }

  @Mutation(() => CampanaEtapasContratacion)
  removeCampanaEtapasContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.campanaEtapasContratacionService.remove(id);
  }

  @ResolveField(() => Campanas, {nullable: true})
  campana(@Parent() campanas: Campanas) {
    return this.campanaEtapasContratacionService.getCampana(campanas.idCampana);
  }

  @ResolveField(() => EtapasContratacion, {nullable: true})
  etapaContratacion(@Parent() etapasContratacion: EtapasContratacion) {
    return this.campanaEtapasContratacionService.getEtapaContratacion(etapasContratacion.idEtapa);
  }
}
