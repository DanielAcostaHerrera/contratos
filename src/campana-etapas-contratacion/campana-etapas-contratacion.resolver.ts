import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CampanaEtapasContratacion } from 'src/models/entities/CampanaEtapasContratacion.entity';
import { Campanas } from 'src/models/entities/Campanas.entity';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
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

  @Mutation(() => [CampanaEtapasContratacion])
  removeSeveralCampanaEtapasContratacion(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.campanaEtapasContratacionService.removeSeveral(id);
  }

  @ResolveField(() => Campanas, {nullable: true})
  campana(@Parent() campanaEtapasContratacion: CampanaEtapasContratacion): Promise<Campanas> {
    return this.campanaEtapasContratacionService.getCampana(campanaEtapasContratacion.idCampana);
  }

  @ResolveField(() => EtapasContratacion, {nullable: true})
  etapaContratacion(@Parent() campanaEtapasContratacion: CampanaEtapasContratacion): Promise<EtapasContratacion> {
    return this.campanaEtapasContratacionService.getEtapaContratacion(campanaEtapasContratacion.idEtapa);
  }

  @ResolveField(() => Paises, {nullable: true})
  pais(@Parent() campanaEtapasContratacion: CampanaEtapasContratacion): Promise<Paises> {
    return this.campanaEtapasContratacionService.getPais(campanaEtapasContratacion.idPais);
  }
}
