import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
import { TiposDocumento } from 'src/models/entities/TiposDocumento.entity';
import { DocumentacionService } from './documentacion.service';
import { CreateDocumentacionInput } from './dto/create-documentacion.input';

@Resolver(() => Documentacion)
export class DocumentacionResolver {
  constructor(private readonly documentacionService: DocumentacionService) {}

  @Mutation(() => Documentacion)
  createDocumentacion(@Args('createDocumentacionInput') createDocumentacionInput: CreateDocumentacionInput) {
    return this.documentacionService.save(createDocumentacionInput);
  }

  @Query(() => [Documentacion], { name: 'documentacion' })
  findAllDocumentacion() {
    return this.documentacionService.findAll();
  }

  @Query(() => Documentacion, { name: 'documentacion' })
  findOneDocumentacion(@Args('id', { type: () => Int }) id: number) {
    return this.documentacionService.findOne(id);
  }

  @Mutation(() => Documentacion)
  removeDocumentacion(@Args('id', { type: () => Int }) id: number) {
    return this.documentacionService.remove(id);
  }

  @ResolveField(() => TiposDocumento, {nullable: true})
  tiposDocumento(@Parent() documentacion: Documentacion): Promise<TiposDocumento> {
    return this.documentacionService.getTipoDocumento(documentacion.idTipoDoc);
  }
}
