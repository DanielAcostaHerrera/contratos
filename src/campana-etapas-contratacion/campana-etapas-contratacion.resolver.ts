import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { CampanaEtapasContratacion } from 'src/models/entities/CampanaEtapasContratacion.entity';
import { CampanaEtapasContratacionService } from './campana-etapas-contratacion.service';
import { CreateCampanaEtapasContratacionInput } from './dto/create-campana-etapas-contratacion.input';

@Resolver(() => CampanaEtapasContratacion)
export class CampanaEtapasContratacionResolver {
  constructor(private readonly campanaEtapasContratacionService: CampanaEtapasContratacionService) {}

  @Mutation(() => CampanaEtapasContratacion)
  @UseGuards(new AuthGuard())
  createCampanaEtapasContratacion(@Args('createCampanaEtapasContratacionInput') createCampanaEtapasContratacionInput: CreateCampanaEtapasContratacionInput) {
    return this.campanaEtapasContratacionService.save(createCampanaEtapasContratacionInput);
  }

  @Query(() => [CampanaEtapasContratacion])
  @UseGuards(new AuthGuard())
  findAllCampanaEtapasContratacion() {
    return this.campanaEtapasContratacionService.findAll();
  }

  @Query(() => CampanaEtapasContratacion)
  @UseGuards(new AuthGuard())
  findOneCampanaEtapasContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.campanaEtapasContratacionService.findOne(id);
  }

  @Mutation(() => CampanaEtapasContratacion)
  @UseGuards(new AuthGuard())
  removeCampanaEtapasContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.campanaEtapasContratacionService.remove(id);
  }

  @Mutation(() => [CampanaEtapasContratacion])
  @UseGuards(new AuthGuard())
  removeSeveralCampanaEtapasContratacion(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.campanaEtapasContratacionService.removeSeveral(id);
  }
}
