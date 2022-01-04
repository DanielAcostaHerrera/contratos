import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TipoContratoService } from './tipo-contrato.service';
import { CreateTipoContratoInput } from './dto/create-tipo-contrato.input';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';

@Resolver(() => TipoContrato)
export class TipoContratoResolver {
  constructor(private readonly tipoContratoService: TipoContratoService) {}

  @Mutation(() => TipoContrato)
  createTipoContrato(@Args('createTipoContratoInput') createTipoContratoInput: CreateTipoContratoInput) {
    return this.tipoContratoService.save(createTipoContratoInput);
  }

  @Query(() => [TipoContrato])
  findAllTipoContrato() {
    return this.tipoContratoService.findAll();
  }

  @Query(() => TipoContrato)
  findOneTipoContrato(@Args('id', { type: () => Int }) id: number) {
    return this.tipoContratoService.findOne(id);
  }

  @Mutation(() => TipoContrato)
  removeTipoContrato(@Args('id', { type: () => Int }) id: number) {
    return this.tipoContratoService.remove(id);
  }

  @Mutation(() => [TipoContrato])
  removeSeveralTipoContrato(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tipoContratoService.removeSeveral(id);
  }
}
