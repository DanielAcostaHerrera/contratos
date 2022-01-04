import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiposDocumentoService } from './tipos-documento.service';
import { CreateTiposDocumentoInput } from './dto/create-tipos-documento.input';
import { TiposDocumento } from 'src/models/entities/TiposDocumento.entity';

@Resolver(() => TiposDocumento)
export class TiposDocumentoResolver {
  constructor(private readonly tiposDocumentoService: TiposDocumentoService) {}

  @Mutation(() => TiposDocumento)
  createTiposDocumento(@Args('createTiposDocumentoInput') createTiposDocumentoInput: CreateTiposDocumentoInput) {
    return this.tiposDocumentoService.save(createTiposDocumentoInput);
  }

  @Query(() => [TiposDocumento])
  findAllTiposDocumento() {
    return this.tiposDocumentoService.findAll();
  }

  @Query(() => TiposDocumento)
  findOneTiposDocumento(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDocumentoService.findOne(id);
  }

  @Mutation(() => TiposDocumento)
  removeTiposDocumento(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDocumentoService.remove(id);
  }

  @Mutation(() => [TiposDocumento])
  removeSeveralTiposDocumento(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tiposDocumentoService.removeSeveral(id);
  }
}
