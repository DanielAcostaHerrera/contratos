import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProformasService } from './proformas.service';
import { CreateProformaInput } from './dto/create-proforma.input';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => Proformas)
export class ProformasResolver {
  constructor(private readonly proformasService: ProformasService) {}

  @Mutation(() => Proformas)
  @UseGuards(new AuthGuard())
  createProforma(@Args('createProformaInput') createProformaInput: CreateProformaInput) {
    return this.proformasService.save(createProformaInput);
  }

  @Query(() => [Proformas])
  @UseGuards(new AuthGuard())
  findAllProforma() {
    return this.proformasService.findAll();
  }

  @Query(() => Proformas)
  @UseGuards(new AuthGuard())
  findOneProforma(@Args('id', { type: () => Int }) id: number) {
    return this.proformasService.findOne(id);
  }

  @Mutation(() => Proformas)
  @UseGuards(new AuthGuard())
  removeProforma(@Args('id', { type: () => Int }) id: number) {
    return this.proformasService.remove(id);
  }

  @Mutation(() => [Proformas])
  @UseGuards(new AuthGuard())
  removeSeveralProforma(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.proformasService.removeSeveral(id);
  }
}
