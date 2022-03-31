import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TipoContratoService } from './tipo-contrato.service';
import { CreateTipoContratoInput } from './dto/create-tipo-contrato.input';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => TipoContrato)
export class TipoContratoResolver {
  constructor(private readonly tipoContratoService: TipoContratoService) {}

  @Mutation(() => TipoContrato)
  @UseGuards(new AuthGuard())
  createTipoContrato(@Args('createTipoContratoInput') createTipoContratoInput: CreateTipoContratoInput) {
    return this.tipoContratoService.save(createTipoContratoInput);
  }

  @Query(() => [TipoContrato])
  @UseGuards(new AuthGuard())
  findAllTipoContrato() {
    return this.tipoContratoService.findAll();
  }

  @Query(() => TipoContrato)
  @UseGuards(new AuthGuard())
  findOneTipoContrato(@Args('id', { type: () => Int }) id: number) {
    return this.tipoContratoService.findOne(id);
  }

  @Mutation(() => TipoContrato)
  @UseGuards(new AuthGuard())
  removeTipoContrato(@Args('id', { type: () => Int }) id: number) {
    return this.tipoContratoService.remove(id);
  }

  @Mutation(() => [TipoContrato])
  @UseGuards(new AuthGuard())
  removeSeveralTipoContrato(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tipoContratoService.removeSeveral(id);
  }
}
