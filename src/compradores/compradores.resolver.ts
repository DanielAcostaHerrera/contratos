import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { DatosEntidad } from 'src/models/entities/DatosEntidad.entity';
import { CompradoresService } from './compradores.service';
import { CreateCompradoresInput } from './dto/create-compradores.input';

@Resolver(() => Compradores)
export class CompradoresResolver {
  constructor(private readonly compradoresService: CompradoresService) {}

  @Mutation(() => Compradores)
  @UseGuards(new AuthGuard())
  createCompradore(@Args('createCompradoreInput') createCompradoreInput: CreateCompradoresInput) {
    return this.compradoresService.save(createCompradoreInput);
  }

  @Query(() => [Compradores])
  @UseGuards(new AuthGuard())
  findAllCompradores() {
    return this.compradoresService.findAll();
  }

  @Query(() => Compradores)
  @UseGuards(new AuthGuard())
  findOneCompradores(@Args('id', { type: () => Int }) id: number) {
    return this.compradoresService.findOne(id);
  }

  @Mutation(() => Compradores)
  @UseGuards(new AuthGuard())
  removeCompradores(@Args('id', { type: () => Int }) id: number) {
    return this.compradoresService.remove(id);
  }

  @Mutation(() => [Compradores])
  @UseGuards(new AuthGuard())
  removeSeveralCompradores(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.compradoresService.removeSeveral(id);
  }

  @ResolveField(() => DatosEntidad, {nullable: true})
  entidad(@Parent() compradores: Compradores): Promise<DatosEntidad> {
    return this.compradoresService.getEntidad(compradores.idEntidad);
  }
}
