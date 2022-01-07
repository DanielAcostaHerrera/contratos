import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
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
  createContratoDesglose(@Args('createContratoDesgloseInput') createContratoDesgloseInput: CreateContratoDesgloseInput) {
    return this.contratoDesgloseService.save(createContratoDesgloseInput);
  }

  @Query(() => [ContratoDesglose])
  findAllContratoDesglose() {
    return this.contratoDesgloseService.findAll();
  }

  @Query(() => ContratoDesglose)
  findOneContratoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.findOne(id);
  }

  @Mutation(() => ContratoDesglose)
  removeContratoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.contratoDesgloseService.remove(id);
  }

  @Mutation(() => [ContratoDesglose])
  removeSeveralContratoDesglose(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.contratoDesgloseService.removeSeveral(id);
  }
  
  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() contratoDesglose: ContratoDesglose): Promise<Embarques> {
    return this.contratoDesgloseService.getEmbarque(contratoDesglose.idEmbarque);
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
