import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProformasService } from './proformas.service';
import { CreateProformaInput } from './dto/create-proforma.input';
import { Proformas } from 'src/models/entities/Proformas.entity';

@Resolver(() => Proformas)
export class ProformasResolver {
  constructor(private readonly proformasService: ProformasService) {}

  @Mutation(() => Proformas)
  createProforma(@Args('createProformaInput') createProformaInput: CreateProformaInput) {
    return this.proformasService.save(createProformaInput);
  }

  @Query(() => [Proformas])
  findAllProforma() {
    return this.proformasService.findAll();
  }

  @Query(() => Proformas)
  findOneProforma(@Args('id', { type: () => Int }) id: number) {
    return this.proformasService.findOne(id);
  }

  @Mutation(() => Proformas)
  removeProforma(@Args('id', { type: () => Int }) id: number) {
    return this.proformasService.remove(id);
  }
}
