import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { ContratoDesgloseService } from './contrato-desglose.service';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Resolver(() => ContratoDesglose)
export class ContratoDesgloseResolver {
  constructor(private readonly contratoDesgloseService: ContratoDesgloseService) {}

  @Mutation(() => ContratoDesglose)
  @UseGuards(new AuthGuard())
  createContratoDesglose(@Args('createContratoDesgloseInput') createContratoDesgloseInput: CreateContratoDesgloseInput) {
    return this.contratoDesgloseService.save(createContratoDesgloseInput);
  }

  @Query(() => [ContratoDesglose])
  @UseGuards(new AuthGuard())
  findAllContratoDesglose() {
    return this.contratoDesgloseService.findAll();
  }

  @Query(() => ContratoDesglose)
  @UseGuards(new AuthGuard())
  findOneContratoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.findOne(id);
  }

  @Mutation(() => ContratoDesglose)
  @UseGuards(new AuthGuard())
  removeContratoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.remove(id);
  }

  @Mutation(() => [ContratoDesglose])
  @UseGuards(new AuthGuard())
  removeSeveralContratoDesglose(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.contratoDesgloseService.removeSeveral(id);
  }

  @ResolveField(() => Referencias, {nullable: true})
  referencia(@Parent() contratoDesglose: ContratoDesglose): Promise<Referencias> {
    return this.contratoDesgloseService.getReferencia(contratoDesglose.idReferencia);
  }

  @ResolveField(() => CodigosParaLaVenta, {nullable: true})
  codigo(@Parent() contratoDesglose: ContratoDesglose): Promise<CodigosParaLaVenta> {
    return this.contratoDesgloseService.getCodigo(contratoDesglose.idCodigo);
  }

  @ResolveField(() => UnidadMedida, {nullable: true})
  unidadMedida(@Parent() contratoDesglose: ContratoDesglose): Promise<UnidadMedida> {
    return this.contratoDesgloseService.getUnidadMedida(contratoDesglose.idUnidadMedida);
  }
}
