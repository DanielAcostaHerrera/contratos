import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
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
}
