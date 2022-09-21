import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
import { DocumentacionService } from './documentacion.service';
import { CreateDocumentacionInput } from './dto/create-documentacion.input';

@Resolver(() => Documentacion)
export class DocumentacionResolver {
  constructor(private readonly documentacionService: DocumentacionService) {}

  @Mutation(() => Documentacion)
  @UseGuards(new AuthGuard())
  createDocumentacion(@Args('createDocumentacionInput') createDocumentacionInput: CreateDocumentacionInput) {
    return this.documentacionService.save(createDocumentacionInput);
  }

  @Query(() => [Documentacion], { name: 'documentacion' })
  @UseGuards(new AuthGuard())
  findAllDocumentacion() {
    return this.documentacionService.findAll();
  }

  @Query(() => Documentacion, { name: 'documentacion' })
  @UseGuards(new AuthGuard())
  findOneDocumentacion(@Args('id', { type: () => Int }) id: number) {
    return this.documentacionService.findOne(id);
  }

  @Mutation(() => Documentacion)
  @UseGuards(new AuthGuard())
  removeDocumentacion(@Args('id', { type: () => Int }) id: number) {
    return this.documentacionService.remove(id);
  }

  @Mutation(() => [Documentacion])
  @UseGuards(new AuthGuard())
  removeSeveralDocumentacion(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.documentacionService.removeSeveral(id);
  }
}
