import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiposDocumentoService } from './tipos-documento.service';
import { CreateTiposDocumentoInput } from './dto/create-tipos-documento.input';
import { TiposDocumento } from 'src/models/entities/TiposDocumento.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => TiposDocumento)
export class TiposDocumentoResolver {
  constructor(private readonly tiposDocumentoService: TiposDocumentoService) {}

  @Mutation(() => TiposDocumento)
  @UseGuards(new AuthGuard())
  createTiposDocumento(@Args('createTiposDocumentoInput') createTiposDocumentoInput: CreateTiposDocumentoInput) {
    return this.tiposDocumentoService.save(createTiposDocumentoInput);
  }

  @Query(() => [TiposDocumento])
  @UseGuards(new AuthGuard())
  findAllTiposDocumento() {
    return this.tiposDocumentoService.findAll();
  }

  @Query(() => TiposDocumento)
  @UseGuards(new AuthGuard())
  findOneTiposDocumento(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDocumentoService.findOne(id);
  }

  @Mutation(() => TiposDocumento)
  @UseGuards(new AuthGuard())
  removeTiposDocumento(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDocumentoService.remove(id);
  }

  @Mutation(() => [TiposDocumento])
  @UseGuards(new AuthGuard())
  removeSeveralTiposDocumento(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tiposDocumentoService.removeSeveral(id);
  }
}
