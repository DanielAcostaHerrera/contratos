import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PagosApartirDeService } from './pagos-apartir-de.service';
import { CreatePagosApartirDeInput } from './dto/create-pagos-apartir-de.input';
import { PagosAPartirDe } from 'src/models/entities/PagosAPartirDe.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => PagosAPartirDe)
export class PagosApartirDeResolver {
  constructor(private readonly pagosApartirDeService: PagosApartirDeService) {}

  @Mutation(() => PagosAPartirDe)
  @UseGuards(new AuthGuard())
  createPagosApartirDe(@Args('createPagosApartirDeInput') createPagosApartirDeInput: CreatePagosApartirDeInput) {
    return this.pagosApartirDeService.save(createPagosApartirDeInput);
  }

  @Query(() => [PagosAPartirDe])
  @UseGuards(new AuthGuard())
  findAllPagosAPartirDe() {
    return this.pagosApartirDeService.findAll();
  }

  @Query(() => PagosAPartirDe)
  @UseGuards(new AuthGuard())
  findOnePagosAPartirDe(@Args('id', { type: () => Int }) id: number) {
    return this.pagosApartirDeService.findOne(id);
  }

  @Mutation(() => PagosAPartirDe)
  @UseGuards(new AuthGuard())
  removePagosApartirDe(@Args('id', { type: () => Int }) id: number) {
    return this.pagosApartirDeService.remove(id);
  }

  @Mutation(() => [PagosAPartirDe])
  @UseGuards(new AuthGuard())
  removeSeveralPagosApartirDe(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.pagosApartirDeService.removeSeveral(id);
  }
}
