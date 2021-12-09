import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
import { DocumentacionContrato } from 'src/models/entities/DocumentacionContrato.entity';
import { DocumentacionContratoService } from './documentacion-contrato.service';
import { CreateDocumentacionContratoInput } from './dto/create-documentacion-contrato.input';

@Resolver(() => DocumentacionContrato)
export class DocumentacionContratoResolver {
  constructor(private readonly documentacionContratoService: DocumentacionContratoService) {}

  @Mutation(() => DocumentacionContrato)
  createDocumentacionContrato(@Args('createDocumentacionContratoInput') createDocumentacionContratoInput: CreateDocumentacionContratoInput) {
    return this.documentacionContratoService.save(createDocumentacionContratoInput);
  }

  @Query(() => [DocumentacionContrato])
  findAllDocumentacionContrato() {
    return this.documentacionContratoService.findAll();
  }

  @Query(() => DocumentacionContrato)
  findOneDocumentacionContrato(@Args('id', { type: () => Int }) id: number) {
    return this.documentacionContratoService.findOne(id);
  }

  @Mutation(() => DocumentacionContrato)
  removeDocumentacionContrato(@Args('id', { type: () => Int }) id: number) {
    return this.documentacionContratoService.remove(id);
  }

  @ResolveField(() => Documentacion, {nullable: true})
  documentacion(@Parent() documentacionContrato: DocumentacionContrato): Promise<Documentacion> {
    return this.documentacionContratoService.getDocumentacion(documentacionContrato.idDocumento);
  }

  @ResolveField(() => Contratos, {nullable: true})
  contratos(@Parent() documentacionContrato: DocumentacionContrato): Promise<Contratos> {
    return this.documentacionContratoService.getContrato(documentacionContrato.idContrato);
  }
}
