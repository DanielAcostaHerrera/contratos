import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoDesgloseService } from './suplemento-desglose.service';
import { CreateSuplementoDesgloseInput } from './dto/create-suplemento-desglose.input';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SuplementoDesglose)
export class SuplementoDesgloseResolver {
  constructor(private readonly suplementoDesgloseService: SuplementoDesgloseService) {}

  @Mutation(() => SuplementoDesglose)
  @UseGuards(new AuthGuard())
  createSuplementoDesglose(@Args('createSuplementoDesgloseInput') createSuplementoDesgloseInput: CreateSuplementoDesgloseInput) {
    return this.suplementoDesgloseService.save(createSuplementoDesgloseInput);
  }

  @Query(() => [SuplementoDesglose])
  @UseGuards(new AuthGuard())
  findAllSuplementoDesglose() {
    return this.suplementoDesgloseService.findAll();
  }

  @Query(() => SuplementoDesglose)
  @UseGuards(new AuthGuard())
  findOneSuplementoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoDesgloseService.findOne(id);
  }

  @Mutation(() => SuplementoDesglose)
  @UseGuards(new AuthGuard())
  removeSuplementoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoDesgloseService.remove(id);
  }

  @Mutation(() => [SuplementoDesglose])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoDesglose(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoDesgloseService.removeSeveral(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoDesglose: SuplementoDesglose): Promise<SuplementoResumen> {
    return this.suplementoDesgloseService.getSuplementoResumen(suplementoDesglose.idSuplementoResumen);
  }

  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() suplementoDesglose: SuplementoDesglose): Promise<Embarques> {
    return this.suplementoDesgloseService.getEmbarque(suplementoDesglose.idEmbarque);
  }

  @ResolveField(() => UnidadMedida, {nullable: true})
  unidadMedida(@Parent() suplementoDesglose: SuplementoDesglose): Promise<UnidadMedida> {
    return this.suplementoDesgloseService.getUnidadMedida(suplementoDesglose.idUnidadMedida);
  }

  @ResolveField(() => CodigosParaLaVenta, {nullable: true})
  codigo(@Parent() suplementoDesglose: SuplementoDesglose): Promise<CodigosParaLaVenta> {
    return this.suplementoDesgloseService.getCodigo(suplementoDesglose.idCodigo);
  }

  @ResolveField(() => Referencias, {nullable: true})
  referencia(@Parent() suplementoDesglose: SuplementoDesglose): Promise<Referencias> {
    return this.suplementoDesgloseService.getReferencia(suplementoDesglose.idReferencia);
  }
}
